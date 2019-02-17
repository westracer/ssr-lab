import * as React from 'react'
import {Form, FormControl, Button, Row, Col, InputGroup} from 'react-bootstrap/index';
import {FormEvent} from 'react';
import Api from 'app/utils/api';
import {Alert} from 'react-bootstrap';

export interface Props {
}

export interface State {
    personState?: JSX.Element;
}

export class AddPage extends React.Component<Props, State> {
    public readonly state = {
        personState: undefined,
    };

    constructor(props: Props) {
        super(props);

        this.fileUpload = React.createRef();
        this.fileLabel = React.createRef();
        this.bioInput = React.createRef();
        this.fioInput = React.createRef();
        this.interestsInput = React.createRef();
        this.postInput = React.createRef();
        this.personForm = React.createRef();
    }

    personForm: React.RefObject<HTMLFormElement>;
    fileUpload: React.RefObject<HTMLInputElement>;
    fileLabel: React.RefObject<HTMLLabelElement>;

    fioInput: React.RefObject<HTMLInputElement>;
    postInput: React.RefObject<HTMLInputElement>;
    interestsInput: React.RefObject<HTMLTextAreaElement>;
    bioInput: React.RefObject<HTMLTextAreaElement>;

    render() {
        const onFileChange = () => {
            if (this.fileUpload.current === null || this.fileUpload.current.files === null) {
                return;
            }

            const file = this.fileUpload.current.files[0];

            if (this.fileLabel.current === null) {
                return;
            }

            if (file) {
                this.fileLabel.current.innerText = file.name;
            } else {
                this.fileLabel.current.innerText = 'Фотография';
            }
        };

        const resetFile = () => {
            if (this.fileUpload.current === null) {
                return;
            }


            this.fileUpload.current.value = '';
            onFileChange();
        };

        const setAlert = (variant: "danger" | "success", message: string) => {
            this.setState({
                ...this.state,
                personState: <Alert variant={variant}>{message}</Alert>
            } as State);
        };

        const getPersonObject = () => {
            return {
                bio: this.bioInput.current ? this.bioInput.current.value : '',
                fio: this.fioInput.current ? this.fioInput.current.value : '',
                interests: this.interestsInput.current ? this.interestsInput.current.value : '',
                post: this.postInput.current ? this.postInput.current.value : '',
                image: undefined
            };
        };

        const addPerson = (person: Object) => {
            const PERSON_ADD_MESSAGE = 'Неизвестная ошибка при добавлении сотрудника';

            Api.personAdd(person)
                .then(({data}: any) => {
                    if (data.success) {
                        setAlert('success', 'Сотрудник успешно добавлен');

                        if (this.personForm.current) {
                            this.personForm.current.reset();
                        }
                    } else {
                        let error = data.errorMessage ? data.errorMessage : PERSON_ADD_MESSAGE;

                        setAlert('danger', error);
                    }
                })
                .catch(() => setAlert('danger', PERSON_ADD_MESSAGE));
        };

        const onPersonSubmit = (evt: FormEvent) =>  {
            evt.preventDefault();

            let person = getPersonObject();

            if (this.fileUpload.current && this.fileUpload.current.files && this.fileUpload.current.files[0]) {
                const file = this.fileUpload.current.files[0];

                let reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                    if (reader.result) {
                        person.image = reader.result as any;
                    }

                    addPerson(person);
                };
            } else {
                addPerson(person);
            }
        };

        return (
            <div className="container">
                <div className={'mt-4 mb-2'}>
                    {this.state.personState}
                </div>
                <Row className="mt-2 py-2 px-3">
                    <h5>Добавить сотрудника</h5>
                </Row>
                <form ref={this.personForm} onSubmit={onPersonSubmit}>
                    <Row>
                        <Col lg className={'mb-3'}>
                            <input ref={this.fioInput} className={'form-control'} type={'text'} placeholder="Ф.И.О." />
                        </Col>
                        <Col md className={'mb-3'}>
                            <input ref={this.postInput} className={'form-control'} type={'text'} placeholder="Должность"/>
                        </Col>
                        <Col md className={'mb-3'}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button onClick={resetFile} className="btn-outline-secondary" type="button">x</Button>
                                </InputGroup.Prepend>
                                <div className="custom-file">
                                    <input type={'file'} id={'photo'} className={'custom-file-input'}
                                                 accept=".jpg,.jpeg,.png" placeholder="Должность"
                                                 ref={this.fileUpload} onChange={onFileChange} />
                                    <label className="custom-file-label" htmlFor="photo" ref={this.fileLabel}>Фотография</label>
                                </div>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md className={'mb-3'}>
                            <textarea ref={this.bioInput} className={'form-control'} rows={6} placeholder="Биография" />
                        </Col>
                        <Col md className={'mb-3'}>
                            <textarea ref={this.interestsInput} className={'form-control'} rows={6} placeholder="Научные интересы" />
                        </Col>
                        <Col className={'mb-3 col-auto d-flex justify-content-end align-items-end'}>
                            <Button type="submit" className="btn btn-primary">
                                Добавить
                            </Button>
                        </Col>
                    </Row>
                </form>
                <hr />

                <Row className="mt-2 py-2 px-3">
                    <h5>Добавить публикацию</h5>
                </Row>
                <Form>
                    <Row>
                        <Col sm className={'mb-3'}>
                            <FormControl placeholder="Заголовок" />
                        </Col>
                        <Col md={'3'} className={'mb-3'}>
                            <FormControl placeholder="Город"/>
                        </Col>
                        <Col md={'3'} className={'mb-3'}>
                            <FormControl placeholder="Издатель"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm className={'mb-3'}>
                            <FormControl type={'number'} min={'1900'} placeholder="Год"/>
                        </Col>
                        <Col sm className={'mb-3'}>
                            <FormControl type={'number'} min={'1'} placeholder="Кол-во страниц"/>
                        </Col>
                        <Col className={'mb-3 col-auto d-flex justify-content-end align-items-end'}>
                            <Button type="button" className="btn btn-primary">
                                Добавить
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}