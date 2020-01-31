import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Country} from '../models';
import {CountryRepository} from '../repositories';

export class CountryControllerController {
  constructor(
    @repository(CountryRepository)
    public countryRepository : CountryRepository,
  ) {}

  @post('/countries', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(Country)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {
            title: 'NewCountry',
            exclude: ['id'],
          }),
        },
      },
    })
    country: Omit<Country, 'id'>,
  ): Promise<Country> {
    return this.countryRepository.create(country);
  }

  @get('/countries/count', {
    responses: {
      '200': {
        description: 'Country model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Country)) where?: Where<Country>,
  ): Promise<Count> {
    return this.countryRepository.count(where);
  }

  @get('/countries', {
    responses: {
      '200': {
        description: 'Array of Country model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Country, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Country)) filter?: Filter<Country>,
  ): Promise<Country[]> {
    return this.countryRepository.find(filter);
  }

  @patch('/countries', {
    responses: {
      '200': {
        description: 'Country PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {partial: true}),
        },
      },
    })
    country: Country,
    @param.query.object('where', getWhereSchemaFor(Country)) where?: Where<Country>,
  ): Promise<Count> {
    return this.countryRepository.updateAll(country, where);
  }

  @get('/countries/{id}', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Country, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Country)) filter?: Filter<Country>
  ): Promise<Country> {
    return this.countryRepository.findById(id, filter);
  }

  @patch('/countries/{id}', {
    responses: {
      '204': {
        description: 'Country PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {partial: true}),
        },
      },
    })
    country: Country,
  ): Promise<void> {
    await this.countryRepository.updateById(id, country);
  }

  @put('/countries/{id}', {
    responses: {
      '204': {
        description: 'Country PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() country: Country,
  ): Promise<void> {
    await this.countryRepository.replaceById(id, country);
  }

  @del('/countries/{id}', {
    responses: {
      '204': {
        description: 'Country DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.countryRepository.deleteById(id);
  }
}
