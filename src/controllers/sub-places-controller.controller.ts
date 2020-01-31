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
import {SubPlaces} from '../models';
import {SubPlacesRepository} from '../repositories';

export class SubPlacesControllerController {
  constructor(
    @repository(SubPlacesRepository)
    public subPlacesRepository : SubPlacesRepository,
  ) {}

  @post('/sub-places', {
    responses: {
      '200': {
        description: 'SubPlaces model instance',
        content: {'application/json': {schema: getModelSchemaRef(SubPlaces)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubPlaces, {
            title: 'NewSubPlaces',
            exclude: ['id'],
          }),
        },
      },
    })
    subPlaces: Omit<SubPlaces, 'id'>,
  ): Promise<SubPlaces> {
    return this.subPlacesRepository.create(subPlaces);
  }

  @get('/sub-places/count', {
    responses: {
      '200': {
        description: 'SubPlaces model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(SubPlaces)) where?: Where<SubPlaces>,
  ): Promise<Count> {
    return this.subPlacesRepository.count(where);
  }

  @get('/sub-places', {
    responses: {
      '200': {
        description: 'Array of SubPlaces model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SubPlaces, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(SubPlaces)) filter?: Filter<SubPlaces>,
  ): Promise<SubPlaces[]> {
    return this.subPlacesRepository.find(filter);
  }

  @patch('/sub-places', {
    responses: {
      '200': {
        description: 'SubPlaces PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubPlaces, {partial: true}),
        },
      },
    })
    subPlaces: SubPlaces,
    @param.query.object('where', getWhereSchemaFor(SubPlaces)) where?: Where<SubPlaces>,
  ): Promise<Count> {
    return this.subPlacesRepository.updateAll(subPlaces, where);
  }

  @get('/sub-places/{id}', {
    responses: {
      '200': {
        description: 'SubPlaces model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SubPlaces, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(SubPlaces)) filter?: Filter<SubPlaces>
  ): Promise<SubPlaces> {
    return this.subPlacesRepository.findById(id, filter);
  }

  @patch('/sub-places/{id}', {
    responses: {
      '204': {
        description: 'SubPlaces PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubPlaces, {partial: true}),
        },
      },
    })
    subPlaces: SubPlaces,
  ): Promise<void> {
    await this.subPlacesRepository.updateById(id, subPlaces);
  }

  @put('/sub-places/{id}', {
    responses: {
      '204': {
        description: 'SubPlaces PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() subPlaces: SubPlaces,
  ): Promise<void> {
    await this.subPlacesRepository.replaceById(id, subPlaces);
  }

  @del('/sub-places/{id}', {
    responses: {
      '204': {
        description: 'SubPlaces DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.subPlacesRepository.deleteById(id);
  }
}
