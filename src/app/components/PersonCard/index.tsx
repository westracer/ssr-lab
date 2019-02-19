import * as React from 'react';
import {getImgSrc} from 'app/utils';
import {PersonModel} from 'app/models/PersonModel';
import {NavLink} from 'react-router-dom';
import Api from 'app/utils/api';

export interface Props {
    person: PersonModel;
    admin?: string;
    removeCallback: (id: number) => void;
}

export class PersonCard extends React.Component<Props> {
    render() {
        const { person, admin, removeCallback } = this.props;

        const removePerson = () => {
            const id = person.id;

            Api.empRemove(id)
                .then(({data}) => {
                    if (!data || !data.success) return;

                    removeCallback(id);
                });
        };

        const renderAdminLinks = () => {
            if (!admin) {
                return null;
            }

            return (
                <div className="mb-2">
                    <NavLink to={`/detail/${person.id}/admin`} exact>Редактировать</NavLink> <a href="javascript:void(0)" onClick={removePerson}>Удалить</a>
                </div>
            );
        };

        return (
            <div className="card">
                <img className="card-img-top card-photo" src={person.image ? person.image : getImgSrc('nophoto.jpeg')} alt="" />
                <div className="card-body">
                    <h5 className="card-title">
                        <NavLink className={'px-0'} to={`/detail/${person.id}`} activeClassName={'active'}>
                            {person.fio}
                        </NavLink>
                    </h5>
                    {renderAdminLinks()}
                    <p className="card-text">
                        <i>{person.post}</i>
                    </p>
                </div>
            </div>
        );
    }
}