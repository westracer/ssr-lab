import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { PersonsActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
// import { TodoList } from 'app/components';

export namespace App {
    export interface Props extends RouteComponentProps<void> {
        actions: PersonsActions;
        filter: TodoModel.Filter;
    }
}

@connect(
    (state: RootState, ownProps): Object => {
        return { };
    },
    (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
        actions: bindActionCreators(omit(PersonsActions, 'Type'), dispatch)
    })
)
export class App extends React.Component<App.Props> {
    // static defaultProps: Partial<App.Props> = {
    //     filter: TodoModel.Filter.SHOW_ALL
    // };

    // constructor(props: App.Props, context?: any) {
    //     super(props, context);
    //     this.handleClearCompleted = this.handleClearCompleted.bind(this);
    //     this.handleFilterChange = this.handleFilterChange.bind(this);
    // }

    // handleClearCompleted(): void {
    //     const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
    //     if (hasCompletedTodo) {
    //         this.props.actions.clearCompleted();
    //     }
    // }
    //
    // handleFilterChange(filter: TodoModel.Filter): void {
    //     this.props.history.push(`#${filter}`);
    // }

    render() {
        // const { todos, actions, filter } = this.props;
        // const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
        // const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
        // const completedCount: any = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

        return (
            {/*<TodoList todos={filteredTodos} actions={actions} />*/}
        );
    }
}
