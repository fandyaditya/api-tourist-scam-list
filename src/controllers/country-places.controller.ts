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
  Country,
  Places,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryPlacesController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/places', {
    responses: {
      '200': {
        description: 'Array of Country has many Places',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Places)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Places>,
  ): Promise<Places[]> {
    return this.countryRepository.places(id).find(filter);
  }

  @post('/countries/{id}/places', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(Places)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Country.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Places, {
            title: 'NewPlacesInCountry',
            exclude: ['id'],
            optional: ['countryId']
          }),
        },
      },
    }) places: Omit<Places, 'id'>,
  ): Promise<Places> {
    return this.countryRepository.places(id).create(places);
  }

  @patch('/countries/{id}/places', {
    responses: {
      '200': {
        description: 'Country.Places PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Places, {partial: true}),
        },
      },
    })
    places: Partial<Places>,
    @param.query.object('where', getWhereSchemaFor(Places)) where?: Where<Places>,
  ): Promise<Count> {
    return this.countryRepository.places(id).patch(places, where);
  }

  @del('/countries/{id}/places', {
    responses: {
      '200': {
        description: 'Country.Places DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Places)) where?: Where<Places>,
  ): Promise<Count> {
    return this.countryRepository.places(id).delete(where);
  }
}
