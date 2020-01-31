import {Entity, model, property} from '@loopback/repository';

@model()
export class SubPlaces extends Entity {
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
  placesId?: number;

  constructor(data?: Partial<SubPlaces>) {
    super(data);
  }
}

export interface SubPlacesRelations {
  // describe navigational properties here
}

export type SubPlacesWithRelations = SubPlaces & SubPlacesRelations;
