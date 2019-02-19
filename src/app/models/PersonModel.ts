import {PublicationModel} from 'app/models/PublicationModel';

export interface PersonModel {
    id: number;
    fio: string;
    post: string;
    bio: string;
    interests: string;
    image?: string;
    publications?: (PublicationModel | number)[];
}