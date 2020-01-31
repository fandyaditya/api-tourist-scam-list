import {Entity, model, property} from '@loopback/repository';

@model()
export class ScamInfo extends Entity {
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
  scam: string;

  @property({
    type: 'string',
    required: true,
  })
  prevent: string;

  @property({
    type: 'string',
    required: true,
  })
  detail: string;

  @property({
    type: 'number',
  })
  placesId?: number;

  constructor(data?: Partial<ScamInfo>) {
    super(data);
  }
}

export interface ScamInfoRelations {
  // describe navigational properties here
}

export type ScamInfoWithRelations = ScamInfo & ScamInfoRelations;
