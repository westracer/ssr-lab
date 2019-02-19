import * as React from 'react';
import {PersonCard} from 'app/components/PersonCard';
import {PersonModel} from 'app/models/PersonModel';
import Api from 'app/utils/api';

export interface Props {
    persons: PersonModel[];
    admin?: string;
}

export interface State {
    personList?: PersonModel[];
    searchingText: string;
}

export class ListPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            searchingText: 'Получаем список сотрудников',
        } as State;
    }

    setFetchError = () => {
        this.setState({
            ...this.state,
            searchingText: 'Не удалось получить информацию'
        });
    };

    fetchPersonList = () => {
        Api.personGet(true, [])
            .then(({data}) => {
                if (!data.success || data.persons.length === 0) {
                    this.setFetchError();
                    return;
                }

                this.setState({
                    ...this.state,
                    personList: data.persons as PersonModel[]
                });
            })
            .catch(() => {
                this.setFetchError();
            });
    };

    componentDidMount() {
        this.fetchPersonList();
    }

    render() {
        const { admin } = this.props;
        const { personList, searchingText } = this.state;

        if (!personList) {
            return <div className="container my-3">{searchingText}</div>;
        }

        return (
            <div className="container card-list">
                <div className="card-columns mt-4">
                    {personList.map((person: PersonModel, index: number) => <div key={index} className="col-sm"><PersonCard admin={admin} person={person} /></div>)}
                </div>
            </div>
        );
    }
}