import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { PersonModel } from 'app/models/PersonModel';
import { DetailPage as DetailPageComponent } from 'app/components/Pages/detail';

interface RouterProps {
    id: string;
}

export interface Props extends RouteComponentProps<RouterProps> {
    person?: PersonModel;
}

@connect(
    (state: RootState, ownProps: Props): Pick<Props, 'person'> => {
        return { person: state.persons.find((test: PersonModel) => test.id === parseInt(ownProps.match.params.id, 10)) };
    },
    // (dispatch: Dispatch): Pick<Props, 'actions'> => ({
    //     actions: bindActionCreators(omit(PersonsActions, 'Type'), dispatch)
    // })
)

export class DetailPage extends React.Component<Props> {
    render() {
        const { person } = this.props;
        // const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
        // const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
        // const completedCount: any = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

        return (
            <DetailPageComponent person={person} />
        );
    }
}
