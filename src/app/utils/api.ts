import axios, {AxiosInstance, AxiosPromise} from 'axios';
import * as qs from 'qs';

const ROUTES = {
    personAdd: '/person/add',
    personGet: '/person/get',
    personRemove: '/person/remove',
    personUpdate: '/person/update',
    personAddPub: '/person/add-pub',
    personRemovePub: '/person/remove-pub',
    publicationAdd: '/publication/add',
    publicationGetAllTitles: '/publication/get-all-titles',
    publicationUpdate: '/publication/update',
    publicationRemove:  '/publication/remove',
};

const API_URL = 'http://silexapi.local';

export default class Api {
    private static instance: AxiosInstance;

    private static checkInstance = () => {
        if (!Api.instance) {
            Api.instance = axios.create({
                baseURL: `${API_URL}`,
                timeout: 1000,
                transformRequest: [(data, headers) => {
                    delete headers.common.Authorization;

                    return qs.stringify(data);
                }]
            });
        }
    };

    static personAdd = (person: Object): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.post(ROUTES.personAdd, {
            person: person
        });
    };

    static publicationAdd = (publication: Object): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.post(ROUTES.publicationAdd, {
            publication: publication
        });
    };

    static personGet = (noPubs: boolean = false, ids?: string[]): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.get(ROUTES.personGet, {
            params: {
                ids: ids,
                noPubs: noPubs,
            }
        });
    };

    static personPubRemove = (pubId: number, personId: number): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.post(ROUTES.personRemovePub, {
            pubId: pubId,
            personId: personId
        });
    };

    static personRemove = (personId: number): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.post(ROUTES.personRemove, {
            id: personId
        });
    };

    static empPubAdd = (pubId: number, personId: number): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.post(ROUTES.personAddPub, {
            pubId: pubId,
            personId: personId
        });
    };

    static personUpdate = (fields: Object): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.post(ROUTES.personUpdate, {
            fields: fields
        });
    };

    static publicationUpdate = (fields: Object): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.post(ROUTES.publicationUpdate, {
            fields: fields
        });
    };

    static publicationGetAllTitles = (ids: number[]): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.get(ROUTES.publicationGetAllTitles, {
            params: {
                ids: ids
            }
        });
    };

    static publicationRemove = (id: number): AxiosPromise => {
        Api.checkInstance();

        return Api.instance.post(ROUTES.publicationRemove, {
            id: id
        });
    };
}