import * as React from 'react';
// import {TodoTextInput} from '../TodoTextInput';
// import {PersonsActions} from 'app/actions/todos';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap/index';
import {getIconSrc} from 'app/utils';
import {NavLink} from 'react-router-dom';

export interface Props {
    // addTodo: typeof PersonsActions.addTodo;
}

export class Header extends React.Component<Props> {
    constructor(props: Props, context?: any) {
        super(props, context);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(text: string) {
        if (text.length) {
            // this.props.addTodo({text});
        }
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
                            <NavLink className={'nav-link'} to={'/'} exact={true} activeClassName={'active'}>Главная</NavLink>
                            <NavLink className={'nav-link'} to={'/list'} activeClassName={'active'}>Сотрудники</NavLink>
                            <NavLink className={'nav-link'} to={'/add'} activeClassName={'active'}>Добавление</NavLink>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Введите ..." className="my-2 my-sm-0 mx-0 mr-sm-2" />
                            <Button variant="primary" className={"search-btn"}>Найти</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {/*<h1>Todos</h1>*/}
                {/*<TodoTextInput newTodo onSave={this.handleSave} placeholder="What needs to be done?" />*/}
            </header>
        );
    }
}
