import axios, {AxiosInstance, AxiosPromise} from 'axios';
import * as qs from 'qs';

const ROUTES = {
    person: '/person',
    personAdd: '/person/add'
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
    }
}