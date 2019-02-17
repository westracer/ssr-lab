import * as React from 'react';
import {PersonModel} from 'app/models/PersonModel';
import {getImgSrc} from 'app/utils';
const sanitizeHtml = require('sanitize-html');

export interface Props {
    person?: PersonModel;
}

export class DetailPage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.interestsDiv = React.createRef();
    }

    interestsDiv: React.RefObject<HTMLDivElement>;

    render() {
        const { person } = this.props;

        if (!person) {
            return null;
        }

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
                        <hr />
                        Список публикаций: <br />
                        <ul>
                            <li className={'mb-2'}>
                                Тихонов А. В., Маркин В. В.
                                Атлас модернизации России и ее регионов: социоэкономические
                                и социокультурные тенденции и проблемы. Колл. научный труд /
                                Сост. и отв. ред. член-корр. РАН Н.И. Лапин. Центр изучения
                                социокультурных изменений. Институт философии РАН. М., 2016.
                                Рец. А.В. Тихонов, В.В. Маркин // Социологические
                                исследования. 2017. № 7, C. 170-172
                                <button type="button"
                                        className="btn btn-danger ml-2 py-0 px-2">x</button>
                            </li>
                            <li>
                                Тихонов А. В., Богданов В. С., Гусейнова К. Э.
                                Гражданская онлайн-экспертиза деятельности региональных
                                систем управления в контексте процессов социокультурной
                                модернизации регионов [Текст] / А.В. Тихонов, В.С. Богданов,
                                К.Э. Гусейнова // Экономические и социальные перемены:
                                факты, тенденции, прогноз. – 2017. – № 1. – C. 101-123. –
                                DOI: 10.15838/esc.2017.1.49.6
                                <button type="button"
                                        className="btn btn-danger py-0 px-2">x</button>
                            </li>
                            <li>
                                Тихонов А. В., Рабинович Е. И., Гусейнова К. Э.
                                Дополнительные показатели процесса модернизации и
                                региональных различий: информационная карта регионов //
                                Россия: реформирование властно-управленческой вертикали в
                                контексте проблем социокультурной модернизации регионов
                                [монография] / [А. В. Тихонов и др.]; отв. ред. А. В.
                                Тихонов. — Москва : ФНИСЦ РАН, 2017. С. 41-47.
                                <button type="button"
                                        className="btn btn-danger py-0 px-2">x</button>
                            </li>
                            <li>
                                Тихонов А. В.
                                Заключение // Россия: реформирование властно-управленческой
                                вертикали в контексте проблем социокультурной модернизации
                                регионов [монография] / [А. В. Тихонов и др.]; отв. ред. А.
                                В. Тихонов. — Москва : ФНИСЦ РАН, 2017. С. 333-347.
                                <button type="button"
                                        className="btn btn-danger py-0 px-2">x</button>
                            </li>
                            <li>
                                Тихонов А. В.
                                Исследование отношения населения регионов с разным уровнем
                                социокультурной модернизации к условиям жизни и к работе
                                властно-управленческой вертикали: элементы программы //
                                Россия: реформирование властно-управленческой вертикали в
                                контексте проблем социокультурной модернизации регионов
                                [монография] / [А. В. Тихонов и др.]; отв. ред. А. В.
                                Тихонов. — Москва : ФНИСЦ РАН, 2017. С. 48-60.
                                <button type="button"
                                        className="btn btn-danger py-0 px-2">x</button>
                            </li>
                        </ul>
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