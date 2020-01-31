import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Places,
  SubPlaces,
} from '../models';
import {PlacesRepository} from '../repositories';

export class PlacesSubPlacesController {
  constructor(
    @repository(PlacesRepository) protected placesRepository: PlacesRepository,
  ) { }

  @get('/places/{id}/sub-places', {
    responses: {
      '200': {
        description: 'Array of Places has many SubPlaces',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SubPlaces)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SubPlaces>,
  ): Promise<SubPlaces[]> {
    return this.placesRepository.subPlaces(id).find(filter);
  }

  @post('/places/{id}/sub-places', {
    responses: {
      '200': {
        description: 'Places model instance',
        content: {'application/json': {schema: getModelSchemaRef(SubPlaces)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Places.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubPlaces, {
            title: 'NewSubPlacesInPlaces',
            exclude: ['id'],
            optional: ['placesId']
          }),
        },
      },
    }) subPlaces: Omit<SubPlaces, 'id'>,
  ): Promise<SubPlaces> {
    return this.placesRepository.subPlaces(id).create(subPlaces);
  }

  @patch('/places/{id}/sub-places', {
    responses: {
      '200': {
        description: 'Places.SubPlaces PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubPlaces, {partial: true}),
        },
      },
    })
    subPlaces: Partial<SubPlaces>,
    @param.query.object('where', getWhereSchemaFor(SubPlaces)) where?: Where<SubPlaces>,
  ): Promise<Count> {
    return this.placesRepository.subPlaces(id).patch(subPlaces, where);
  }

  @del('/places/{id}/sub-places', {
    responses: {
      '200': {
        description: 'Places.SubPlaces DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SubPlaces)) where?: Where<SubPlaces>,
  ): Promise<Count> {
    return this.placesRepository.subPlaces(id).delete(where);
  }
}
