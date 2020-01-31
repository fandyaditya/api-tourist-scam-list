import {Entity, model, property, hasMany} from '@loopback/repository';
import {SubPlaces} from './sub-places.model';
import {PlacesPic} from './places-pic.model';
import {ScamInfo} from './scam-info.model';

@model()
export class Places extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  countryId?: number;

  @hasMany(() => SubPlaces)
  subPlaces: SubPlaces[];

  @hasMany(() => PlacesPic)
  placesPics: PlacesPic[];

  @hasMany(() => ScamInfo)
  scamInfos: ScamInfo[];

  constructor(data?: Partial<Places>) {
    super(data);
  }
}

export interface PlacesRelations {
  // describe navigational properties here
}

export type PlacesWithRelations = Places & PlacesRelations;
