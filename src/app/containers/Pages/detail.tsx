import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { DetailPage as DetailPageComponent } from 'app/components/Pages/detail';

interface RouterProps {
    id: string;
    admin?: string;
}

export interface Props extends RouteComponentProps<RouterProps> {
    id: string;
    admin?: string;
}

@connect(
    (state: RootState, ownProps: Props): Pick<Props, 'id' | 'admin'> => {
        return {
            id: ownProps.match.params.id,
            admin: ownProps.match.params.admin
        };
    },
)

export class DetailPage extends React.Component<Props> {
    render() {
        const { id, admin } = this.props;

        return (
            <DetailPageComponent admin={admin} id={id} />
        );
    }
}
