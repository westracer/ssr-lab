import * as React from 'react';
import {getImgSrc} from 'app/utils';
import {PersonModel} from 'app/models/PersonModel';
import {NavLink} from 'react-router-dom';

export interface Props {
    person: PersonModel;
}

export class PersonCard extends React.Component<Props> {
    render() {
        const { person } = this.props;

        return (
            <div className="card">
                <img className="card-img-top card-photo" src={person.imageUrl ? person.imageUrl : getImgSrc('nophoto.jpeg')} alt="" />
                <div className="card-body">
                    <h5 className="card-title">
                        <NavLink className={'px-0'} to={`/detail/${person.id}`} activeClassName={'active'}>
                            {person.name}
                        </NavLink>
                    </h5>
                    <p className="card-text">
                        <i>{person.title}</i>
                    </p>
                </div>
            </div>
        );
    }
}