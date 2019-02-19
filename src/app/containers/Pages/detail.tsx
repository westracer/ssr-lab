import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { DetailPage as DetailPageComponent } from 'app/components/Pages/detail';

interface RouterProps {
    id: string;
}

export interface Props extends RouteComponentProps<RouterProps> {
    id: string;
}

@connect(
    (state: RootState, ownProps: Props): Pick<Props, 'id'> => {
        return {
            id: ownProps.match.params.id
        };
    },
    // (dispatch: Dispatch): Pick<Props, 'actions'> => ({
    //     actions: bindActionCreators(omit(PersonsActions, 'Type'), dispatch)
    // })
)

export class DetailPage extends React.Component<Props> {
    render() {
        const { id } = this.props;
        // const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
        // const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
        // const completedCount: any = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

        return (
            <DetailPageComponent id={id} />
        );
    }
}
