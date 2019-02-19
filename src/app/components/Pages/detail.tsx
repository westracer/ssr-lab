import * as React from 'react';
import {getImgSrc} from 'app/utils';
import Api from 'app/utils/api';
import {addPub, mapPersonPubsFromData, PersonModel, removePub} from 'app/models/PersonModel';
import {PublicationModel} from 'app/models/PublicationModel';
const sanitizeHtml = require('sanitize-html');

export interface Props {
    id: string;
}

export interface State {
    person?: PersonModel;
    searchingText: string;
    publications?: PublicationModel[];
}

export class DetailPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.interestsDiv = React.createRef();
        this.pubSelect = React.createRef();

        this.state = {
            searchingText: 'Получаем данные о сотруднике',
            publications: []
        } as State;
    }

    pubSelect: React.RefObject<HTMLSelectElement>;

    setFetchError = () => {
        this.setState({
            ...this.state,
            searchingText: 'Не удалось получить информацию'
        });
    };

    fetchPerson = () => {
        Api.personGet(false, [this.props.id])
            .then(({data}) => {
                if (!data.success || data.persons.length === 0) {
                    this.setFetchError();
                    return;
                }

                this.setState({
                    ...this.state,
                    person: mapPersonPubsFromData(data),
                    publications: Object.values(data.publications) as PublicationModel[]
                });
            })
            .catch(() => {
                this.setFetchError();
            });
    };

    componentDidMount() {
        this.fetchPerson();
    }

    interestsDiv: React.RefObject<HTMLDivElement>;

    render() {
        const { person, searchingText } = this.state;

        if (!person) {
            return <div className="container my-3">{searchingText}</div>;
        }

        const onRemoveEmpPub = (evt: any) => {
            const pubId = parseInt(evt.target.dataset['pub'], 10);

            Api.empPubRemove(pubId, person.id)
                .then(({data}) => {
                    if (!data.success) {
                        return;
                    }

                    const state = this.state;
                    this.setState({
                        ...state,
                        person: removePub(person, pubId)
                    });
                });
        };

        const onAddEmpPub = () => {
            if (!this.pubSelect.current) return;
            const selectVal = this.pubSelect.current.value;

            if (selectVal === '') return;
            const pubId = parseInt(selectVal, 10);

            Api.empPubAdd(pubId, person.id)
                .then(({data}) => {
                    if (!data.success) {
                        return;
                    }

                    const state = this.state;
                    this.setState({
                        ...state,
                        person: addPub(person, data.pub as PublicationModel)
                    });
                });
        };

        const renderPublications = () => {
            if (person.publications !== undefined && person.publications.length > 0) {
                const lis = person.publications.map((pub: PublicationModel | number) => {
                    if (typeof pub === 'number') {
                        return -1;
                    }

                    return (
                        <li key={pub.id} className={'mb-2'}>
                            <span contentEditable suppressContentEditableWarning>{pub.title}</span>
                            <span> {pub.authors}</span> /
                            <span contentEditable suppressContentEditableWarning> {pub.publisher}</span>,
                            <span contentEditable suppressContentEditableWarning> {pub.city}</span>.
                            <span contentEditable suppressContentEditableWarning> {pub.year}</span>. Стр.
                            <span contentEditable suppressContentEditableWarning> {pub.pages}</span>.
                            <button data-pub={pub.id} onClick={onRemoveEmpPub}
                                    type="button" className="btn btn-danger ml-2 py-0 px-2">x</button>
                        </li>
                    );
                });

                return (
                    <>
                        <hr />
                        Список публикаций: <br />
                        <ul>
                            {lis}
                        </ul>
                    </>
                );
            } else {
                return null;
            }
        };

        const renderPubSelect = () => {
            if (!this.state.publications || this.state.publications.length === 0) {
                return;
            }

            return (
                <div className="row">
                    <div className="col input-group">
                        <div className={'col-sm mx-0 px-0 mb-3'}>
                            <select ref={this.pubSelect} defaultValue={''} className="custom-select col-sm" id="inputGroupSelect01">
                                <option value={''} disabled>Выберите публикацию</option>
                                {this.state.publications.map((pub: PublicationModel) => <option key={pub.id} value={pub.id}>{pub.title}</option>)}
                            </select>
                        </div>
                        {/*<div className={'col-sm mx-0 px-0 mb-3'}>*/}
                        {/*<input type="text" className="form-control" placeholder={'Найти публикацию'} />*/}
                        {/*</div>*/}
                        <div className="input-group-append mb-3">
                            <button onClick={onAddEmpPub} className="btn btn-outline-secondary" type="button">Добавить</button>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className="container mb-2">
                <div className="row mt-4">
                    <div className="col-md-3 m-1 d-flex">
                        <img className="mr-3 img-fluid detail-pic" src={person.image ? person.image : getImgSrc('nophoto.jpeg')} alt="" />
                    </div>
                    <div className="col-md">
                        <h5 contentEditable suppressContentEditableWarning className="mt-0 mb-1">{person.fio}</h5>
                        <i>{person.post}</i>
                        {
                            !person.interests ?
                                null :
                                <>
                                    <br /><hr />Список научных интересов:
                                    <div contentEditable suppressContentEditableWarning
                                         className={'mt-3 styled-list'}
                                         dangerouslySetInnerHTML={{__html: sanitizeHtml(person.interests)}}
                                         ref={this.interestsDiv}
                                         onBlur={event => console.log(this.interestsDiv.current !== null ? this.interestsDiv.current.innerHTML : null)}
                                    />
                                </>
                        }
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md">
                        <div className={'styled-list'} dangerouslySetInnerHTML={{__html: sanitizeHtml(person.bio)}} />
                        <div className="row my-2 d-flex justify-content-end">
                            <button type="button" className="search-btn btn btn-primary">Сохранить</button>
                        </div>
                        {renderPublications()}
                    </div>
                </div>
                {renderPubSelect()}
            </div>
        );
    }
}