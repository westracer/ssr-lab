import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
import {PersonModel} from 'app/models/PersonModel';
import {PersonsActions} from 'app/actions/persons';
import {ListPage as ListPageComponent} from 'app/components/Pages/list';

export interface Props extends RouteComponentProps<void> {
    persons: PersonModel[];
    actions: PersonsActions;
}

@connect(
    (state: RootState, ownProps): Pick<Props, 'persons'> => {
        return { persons: state.persons };
    },
    (dispatch: Dispatch): Pick<Props, 'actions'> => ({
        actions: bindActionCreators(omit(PersonsActions, 'Type'), dispatch)
    })
)

export class ListPage extends React.Component<Props> {
    static defaultProps: Partial<Props> = {
    };

    constructor(props: Props, context?: any) {
        super(props, context);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleClearCompleted(): void {
        // const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
        // if (hasCompletedTodo) {
        //     this.props.actions.clearCompleted();
        // }
    }

    handleFilterChange(filter: TodoModel.Filter): void {
        // this.props.history.push(`#${filter}`);
    }

    render() {
        const { persons } = this.props;
        // const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
        // const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
        // const completedCount: any = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

        return (
            <ListPageComponent persons={persons} />
        );
    }
}
