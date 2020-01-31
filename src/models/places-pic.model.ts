import {Entity, model, property} from '@loopback/repository';

@model()
export class PlacesPic extends Entity {
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
  uri: string;

  @property({
    type: 'number',
  })
  placesId?: number;

  constructor(data?: Partial<PlacesPic>) {
    super(data);
  }
}

export interface PlacesPicRelations {
  // describe navigational properties here
}

export type PlacesPicWithRelations = PlacesPic & PlacesPicRelations;
