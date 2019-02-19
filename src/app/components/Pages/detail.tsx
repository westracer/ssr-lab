import * as React from 'react';
import {getImgSrc} from 'app/utils';
import Api from 'app/utils/api';
import {PersonModel} from 'app/models/PersonModel';
import {PublicationModel} from 'app/models/PublicationModel';
const sanitizeHtml = require('sanitize-html');

export interface Props {
    id: string;
}

export interface State {
    person?: PersonModel;
    searchingText: string;
}

export class DetailPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.interestsDiv = React.createRef();

        this.state = {
            searchingText: 'Получаем данные о сотруднике'
        } as State;
    }

    setFetchError = () => {
        this.setState({
            ...this.state,
            searchingText: 'Не удалось получить информацию'
        });
    };

    componentDidMount() {
        Api.personGet(false, [this.props.id])
            .then(({data}) => {
                if (!data.success || data.persons.length === 0) {
                    this.setFetchError();
                    return;
                }

                // TODO: move it to models
                let person = data.persons[0] as PersonModel;
                if (person.publications !== undefined) {
                    let pubs = person.publications.map((pub: any) => {
                        if (person.publications
                            && typeof pub === 'number'
                            && data.publications.hasOwnProperty(pub)
                        ) {
                            return data.publications[pub] as PublicationModel;
                        } else {
                            return -1;
                        }
                    });

                    person.publications = pubs.filter((test) => test !== -1);
                }

                this.setState({
                    ...this.state,
                    person: person
                });
            })
            .catch(() => {
                this.setFetchError();
            });
    }

    interestsDiv: React.RefObject<HTMLDivElement>;

    render() {
        const { person, searchingText } = this.state;

        if (!person) {
            return <div className="container my-3">{searchingText}</div>;
        }

        const renderPublications = () => {
            if (person.publications !== undefined && person.publications.length > 0) {
                // TODO: move it to models
                const lis = person.publications.map((pub: PublicationModel | number) => {
                    if (typeof pub === 'number') {
                        return -1;
                    }

                    return (
                        <li key={pub.id} className={'mb-2'}>
                            {`${pub.authors} ${pub.title} / ${pub.publisher}, ${pub.city}. ${pub.year}. С. ${pub.pages}`}
                            <button type="button" className="btn btn-danger ml-2 py-0 px-2">x</button>
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
                        {renderPublications()}
                    </div>
                </div>
                <div className="row mt-1 mx-1">
                    <nav aria-label="..." className="ml-auto">
                        <ul className="pagination pagination-sm">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Пред.</span>
                                </a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link" href="#">1</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">След.</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="row">
                    <div className="col input-group">
                        <div className={'col-sm mx-0 px-0 mb-3'}>
                            <select defaultValue={''} className="custom-select col-sm" id="inputGroupSelect01">
                                <option value={''} disabled>Выберите публикацию</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className={'col-sm mx-0 px-0 mb-3'}>
                            <input type="text" className="form-control" placeholder={'Найти публикацию'} />
                        </div>
                        <div className="input-group-append mb-3">
                            <button className="btn btn-outline-secondary" type="button">Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}