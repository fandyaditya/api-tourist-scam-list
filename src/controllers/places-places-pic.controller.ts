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
  PlacesPic,
} from '../models';
import {PlacesRepository} from '../repositories';

export class PlacesPlacesPicController {
  constructor(
    @repository(PlacesRepository) protected placesRepository: PlacesRepository,
  ) { }

  @get('/places/{id}/places-pics', {
    responses: {
      '200': {
        description: 'Array of Places has many PlacesPic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlacesPic)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PlacesPic>,
  ): Promise<PlacesPic[]> {
    return this.placesRepository.placesPics(id).find(filter);
  }

  @post('/places/{id}/places-pics', {
    responses: {
      '200': {
        description: 'Places model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlacesPic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Places.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlacesPic, {
            title: 'NewPlacesPicInPlaces',
            exclude: ['id'],
            optional: ['placesId']
          }),
        },
      },
    }) placesPic: Omit<PlacesPic, 'id'>,
  ): Promise<PlacesPic> {
    return this.placesRepository.placesPics(id).create(placesPic);
  }

  @patch('/places/{id}/places-pics', {
    responses: {
      '200': {
        description: 'Places.PlacesPic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlacesPic, {partial: true}),
        },
      },
    })
    placesPic: Partial<PlacesPic>,
    @param.query.object('where', getWhereSchemaFor(PlacesPic)) where?: Where<PlacesPic>,
  ): Promise<Count> {
    return this.placesRepository.placesPics(id).patch(placesPic, where);
  }

  @del('/places/{id}/places-pics', {
    responses: {
      '200': {
        description: 'Places.PlacesPic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PlacesPic)) where?: Where<PlacesPic>,
  ): Promise<Count> {
    return this.placesRepository.placesPics(id).delete(where);
  }
}
