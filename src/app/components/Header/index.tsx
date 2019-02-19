import * as React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap/index';
import {getIconSrc} from 'app/utils';
import {NavLink} from 'react-router-dom';

export interface Props {
}

export class Header extends React.Component<Props> {
    constructor(props: Props, context?: any) {
        super(props, context);
    }

    render() {
        return (
            <header>
                <Navbar className={"header-navbar"} bg="light" expand="lg">
                    <Navbar.Brand className={"whole-logo"} href="#home">
                        <img
                            src={getIconSrc('logo')}
                            width="30"
                            height="30"
                            className="d-inline-block align-top logo-image"
                            alt=""
                        />
                        <span className={"title"}>Научный институт</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <div className={'nav-link'}>
                                <NavLink to={'/'} exact activeClassName={'active'}>Главная</NavLink>
                            </div>
                            <div className={'nav-link'}>
                                <NavLink to={'/list/'} exact activeClassName={'active'}>Сотрудники</NavLink> (<NavLink to={'/list/admin'} exact activeClassName={'active'}>админ</NavLink>)
                            </div>
                            <div className={'nav-link'}>
                                <NavLink to={'/admin'} activeClassName={'active'}>Администрирование</NavLink>
                            </div>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Введите ..." className="my-2 my-sm-0 mx-0 mr-sm-2" />
                            <Button variant="primary" className={"search-btn"}>Найти</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}
