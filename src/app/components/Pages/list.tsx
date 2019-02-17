import * as React from 'react';
import {PersonCard} from 'app/components/PersonCard';
import {PersonModel} from 'app/models/PersonModel';

export interface Props {
    persons: PersonModel[];
}

export class ListPage extends React.Component<Props> {
    render() {
        const { persons } = this.props;

        return (
            <div className="container card-list">
                <div className="card-columns mt-4">
                    {persons.map((person: PersonModel, index: number) => <div key={index} className="col-sm mb-2"><PersonCard person={person} /></div>)}
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="pagination mt-2 float-right">
                        <li className="page-item"><a className="page-link" href="#">Пред.</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">След.</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}