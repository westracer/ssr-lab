export const PUBLICATION_ALL_FIELDS = ['title', 'city', 'publisher', 'year', 'pages'];

export interface PublicationModel {
    id: number;
    title: string;
    city: string;
    publisher: string;
    year: number;
    pages: number;
    authors: string;
}