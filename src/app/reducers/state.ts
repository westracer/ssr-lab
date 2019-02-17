import {PersonModel} from 'app/models/PersonModel';

export interface RootState {
  persons: PersonsState;
  router?: any;
}

export type PersonsState = PersonModel[];