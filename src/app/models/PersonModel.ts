import {PublicationModel} from 'app/models/PublicationModel';

export const PERSON_ALL_FIELDS = ['fio', 'post', 'bio', 'interests'];

export interface PersonModel {
    id: number;
    fio: string;
    post: string;
    bio: string;
    interests: string;
    image?: string;
    publications?: (PublicationModel | number)[];
}

export const addPub = (person: PersonModel, pub: PublicationModel) => {
    if (person === undefined) return;
    if (person.publications === undefined) {
        person.publications = [];
    }

    person.publications.push(pub);

    return person;
};

export const removePub = (person: PersonModel, pubId: number) => {
    if (person === undefined || person.publications === undefined) return person;

    const pubIndex = person.publications.findIndex((val) => typeof val !== 'number' && val.id === pubId);
    if (pubIndex !== -1) {
        person.publications.splice(pubIndex, 1);
    }

    return person;
};

export const mapPersonPubsFromData = (id: number, data: any) => {
    const persons = data.persons as PersonModel[];

    let person = persons.find((test) => test.id === id) as PersonModel;
    if (person.publications !== undefined) {
        let pubs = person.publications.map((pub: any) => {
            if (person.publications
                && typeof pub === 'number'
                && data.publications.hasOwnProperty(pub)
            ) {
                return data.publications[pub] as PublicationModel;
            } else {
                return -1;
            }
        });

        person.publications = pubs.filter((test) => test !== -1);
    }

    return person;
};