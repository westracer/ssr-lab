import * as React from 'react'
import {Form, FormControl, Button, Row, Col, InputGroup} from 'react-bootstrap/index';

export interface Props {
}

export class AddPage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.fileUpload = React.createRef();
        this.fileLabel = React.createRef();
    }

    fileUpload: React.RefObject<HTMLInputElement>;
    fileLabel: React.RefObject<HTMLLabelElement>;

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

        return (
            <div className="container">
                <Row className="mt-2 py-2 px-3">
                    <h5>Добавить сотрудника</h5>
                </Row>
                <Form>
                    <Row>
                        <Col lg className={'mb-3'}>
                            <FormControl placeholder="Ф.И.О." />
                        </Col>
                        <Col md className={'mb-3'}>
                            <FormControl placeholder="Должность"/>
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
                            <FormControl as="textarea" rows="6" placeholder="Биография" />
                        </Col>
                        <Col md className={'mb-3'}>
                            <FormControl as="textarea" rows="6" placeholder="Научные интересы" />
                        </Col>
                        <Col className={'mb-3 col-auto d-flex justify-content-end align-items-end'}>
                            <Button type="button" className="btn btn-primary">
                                Добавить
                            </Button>
                        </Col>
                    </Row>
                </Form>
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