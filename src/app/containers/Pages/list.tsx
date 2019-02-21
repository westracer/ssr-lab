import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import {PersonModel} from 'app/models/PersonModel';
import {ListPage as ListPageComponent} from 'app/components/Pages/list';

export interface RouterProps {
    admin?: string;
}

export interface Props extends RouteComponentProps<RouterProps> {
    persons: PersonModel[];
    // actions: PersonsActions;
    admin?: string;
}

@connect(
    (state: RootState, ownProps): Pick<Props, 'persons' | 'admin'> => {
        return {
            persons: state.persons,
            admin: ownProps.match.params.admin
        };
    },
    // (dispatch: Dispatch): Pick<Props, 'actions'> => ({
    //     actions: bindActionCreators(omit(PersonsActions, 'Type'), dispatch)
    // })
)

export class ListPage extends React.Component<Props> {
    render() {
        const { persons, admin } = this.props;

        return (
            <ListPageComponent admin={admin} persons={persons} />
        );
    }
}
