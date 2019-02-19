import * as React from 'react';
import {getImgSrc} from 'app/utils';
import Api from 'app/utils/api';
import {addPub, mapPersonPubsFromData, PERSON_ALL_FIELDS, PersonModel, removePub} from 'app/models/PersonModel';
import {PUBLICATION_ALL_FIELDS, PublicationModel} from 'app/models/PublicationModel';
const sanitizeHtml = require('sanitize-html');

export interface Props {
    id: string;
    admin?: string;
}

export interface State {
    person?: PersonModel;
    searchingText: string;
    publications?: PublicationModel[];
}

export class DetailPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.personDivs = [];
        for (let _ of PERSON_ALL_FIELDS) {
            this.personDivs.push(React.createRef());
        }

        this.pubSpans = [];
        for (let _ of PUBLICATION_ALL_FIELDS) {
            this.pubSpans.push(React.createRef());
        }

        this.pubSelect = React.createRef();

        this.state = {
            searchingText: 'Получаем данные о сотруднике',
            publications: []
        } as State;
    }

    pubSpans: React.RefObject<HTMLSpanElement>[];
    personDivs: React.RefObject<HTMLDivElement>[];
    pubSelect: React.RefObject<HTMLSelectElement>;

    componentDidMount() {
        this.fetchPerson();
    }

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

    render() {
        const { person, searchingText } = this.state;
        const admin = !!this.props.admin;
        const contentEditableClass = admin ? 'content-editable' : '';

        if (!person) {
            return <div className="container my-3">{searchingText}</div>;
        }

        const onRemoveEmpPub = (evt: any) => {
            const pubId = parseInt(evt.target.dataset['pub'], 10);

            Api.personPubRemove(pubId, person.id)
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

        const onEditPerson = () => {
            let newInfo = {
                id: person.id
            } as any;

            for (let index in PERSON_ALL_FIELDS) {
                if (this.personDivs[index]) {
                    const div = this.personDivs[index].current;
                    if (!div) return;

                    newInfo[PERSON_ALL_FIELDS[index]] = div.innerText;
                }
            }

            Api.personUpdate(newInfo)
                .then(({data}) => {
                    if (!data || !data.success) return;
                });
        };

        const onEditPublication = (id: number, fieldName: string) => {
            let value;
            const index = PUBLICATION_ALL_FIELDS.indexOf(fieldName);

            if (this.pubSpans[index]) {
                const span = this.pubSpans[index].current;
                if (!span) return;

                value = span.innerText;
            }

            let newInfo = {
                id: id,
                [fieldName]: value
            } as any;

            Api.publicationUpdate(newInfo)
                .then(({data}) => {
                    if (!data || !data.success) return;
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
                            {/*rip codestyle*/}
                            <span ref={this.pubSpans[PUBLICATION_ALL_FIELDS.indexOf('title')]} onBlur={() => onEditPublication(pub.id, 'title')} className={contentEditableClass} contentEditable={admin} suppressContentEditableWarning>{pub.title}</span>
                            <span> {pub.authors}</span> /
                            <span ref={this.pubSpans[PUBLICATION_ALL_FIELDS.indexOf('publisher')]} onBlur={() => onEditPublication(pub.id, 'publisher')} className={contentEditableClass} contentEditable={admin} suppressContentEditableWarning> {pub.publisher}</span>,
                            <span ref={this.pubSpans[PUBLICATION_ALL_FIELDS.indexOf('city')]} onBlur={() => onEditPublication(pub.id, 'city')} className={contentEditableClass} contentEditable={admin} suppressContentEditableWarning> {pub.city}</span>.
                            <span ref={this.pubSpans[PUBLICATION_ALL_FIELDS.indexOf('year')]} onBlur={() => onEditPublication(pub.id, 'year')} className={contentEditableClass} contentEditable={admin} suppressContentEditableWarning> {pub.year}</span>. Стр.
                            <span ref={this.pubSpans[PUBLICATION_ALL_FIELDS.indexOf('pages')]} onBlur={() => onEditPublication(pub.id, 'pages')} className={contentEditableClass} contentEditable={admin} suppressContentEditableWarning> {pub.pages}</span>.
                            {
                                admin ? <button data-pub={pub.id} onClick={onRemoveEmpPub}
                                                type="button" className="btn btn-danger ml-2 py-0 px-2">x</button>
                                    : null
                            }
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
            if (!admin || !this.state.publications || this.state.publications.length === 0) {
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
            <div className="person-details container mb-2">
                <div className="row mt-4">
                    <div className="col-md-3 m-1 d-flex">
                        <img className="mr-3 img-fluid detail-pic" src={person.image ? person.image : getImgSrc('nophoto.jpeg')} alt="" />
                    </div>
                    <div className="col-md">
                        <div ref={this.personDivs[PERSON_ALL_FIELDS.indexOf('fio')]} contentEditable={admin} suppressContentEditableWarning className={`person-name mt-0 mb-1 ${contentEditableClass}`}>
                            {person.fio}
                        </div>
                        <div ref={this.personDivs[PERSON_ALL_FIELDS.indexOf('post')]} className={contentEditableClass} contentEditable={admin} suppressContentEditableWarning>
                            <i>{person.post}</i>
                        </div>
                        {
                            !person.interests ?
                                null :
                                <>
                                    <br /><hr />Список научных интересов:
                                    <div contentEditable={admin} suppressContentEditableWarning
                                         className={`mt-3 styled-list ${contentEditableClass}`}
                                         dangerouslySetInnerHTML={{__html: sanitizeHtml(person.interests)}}
                                         ref={this.personDivs[PERSON_ALL_FIELDS.indexOf('interests')]}
                                    />
                                </>
                        }
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md">
                        <div ref={this.personDivs[PERSON_ALL_FIELDS.indexOf('bio')]} contentEditable={admin} suppressContentEditableWarning className={`styled-list ${contentEditableClass}`} dangerouslySetInnerHTML={{__html: sanitizeHtml(person.bio)}} />
                        <div className="row my-2 d-flex justify-content-end">
                            {admin ? <button type="button" onClick={onEditPerson} className="search-btn btn btn-primary">Сохранить</button> : null}
                        </div>
                        {renderPublications()}
                    </div>
                </div>
                {renderPubSelect()}
            </div>
        );
    }
}