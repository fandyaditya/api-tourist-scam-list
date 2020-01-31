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
import {PlacesPic} from '../models';
import {PlacesPicRepository} from '../repositories';

export class PlacesPicControllerController {
  constructor(
    @repository(PlacesPicRepository)
    public placesPicRepository : PlacesPicRepository,
  ) {}

  @post('/places-pics', {
    responses: {
      '200': {
        description: 'PlacesPic model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlacesPic)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlacesPic, {
            title: 'NewPlacesPic',
            exclude: ['id'],
          }),
        },
      },
    })
    placesPic: Omit<PlacesPic, 'id'>,
  ): Promise<PlacesPic> {
    return this.placesPicRepository.create(placesPic);
  }

  @get('/places-pics/count', {
    responses: {
      '200': {
        description: 'PlacesPic model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PlacesPic)) where?: Where<PlacesPic>,
  ): Promise<Count> {
    return this.placesPicRepository.count(where);
  }

  @get('/places-pics', {
    responses: {
      '200': {
        description: 'Array of PlacesPic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PlacesPic, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PlacesPic)) filter?: Filter<PlacesPic>,
  ): Promise<PlacesPic[]> {
    return this.placesPicRepository.find(filter);
  }

  @patch('/places-pics', {
    responses: {
      '200': {
        description: 'PlacesPic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlacesPic, {partial: true}),
        },
      },
    })
    placesPic: PlacesPic,
    @param.query.object('where', getWhereSchemaFor(PlacesPic)) where?: Where<PlacesPic>,
  ): Promise<Count> {
    return this.placesPicRepository.updateAll(placesPic, where);
  }

  @get('/places-pics/{id}', {
    responses: {
      '200': {
        description: 'PlacesPic model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PlacesPic, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(PlacesPic)) filter?: Filter<PlacesPic>
  ): Promise<PlacesPic> {
    return this.placesPicRepository.findById(id, filter);
  }

  @patch('/places-pics/{id}', {
    responses: {
      '204': {
        description: 'PlacesPic PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlacesPic, {partial: true}),
        },
      },
    })
    placesPic: PlacesPic,
  ): Promise<void> {
    await this.placesPicRepository.updateById(id, placesPic);
  }

  @put('/places-pics/{id}', {
    responses: {
      '204': {
        description: 'PlacesPic PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() placesPic: PlacesPic,
  ): Promise<void> {
    await this.placesPicRepository.replaceById(id, placesPic);
  }

  @del('/places-pics/{id}', {
    responses: {
      '204': {
        description: 'PlacesPic DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.placesPicRepository.deleteById(id);
  }
}
