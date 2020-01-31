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
import {ScamInfo} from '../models';
import {ScamInfoRepository} from '../repositories';

export class ScamInfoControllerController {
  constructor(
    @repository(ScamInfoRepository)
    public scamInfoRepository : ScamInfoRepository,
  ) {}

  @post('/scam-infos', {
    responses: {
      '200': {
        description: 'ScamInfo model instance',
        content: {'application/json': {schema: getModelSchemaRef(ScamInfo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScamInfo, {
            title: 'NewScamInfo',
            exclude: ['id'],
          }),
        },
      },
    })
    scamInfo: Omit<ScamInfo, 'id'>,
  ): Promise<ScamInfo> {
    return this.scamInfoRepository.create(scamInfo);
  }

  @get('/scam-infos/count', {
    responses: {
      '200': {
        description: 'ScamInfo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ScamInfo)) where?: Where<ScamInfo>,
  ): Promise<Count> {
    return this.scamInfoRepository.count(where);
  }

  @get('/scam-infos', {
    responses: {
      '200': {
        description: 'Array of ScamInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ScamInfo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ScamInfo)) filter?: Filter<ScamInfo>,
  ): Promise<ScamInfo[]> {
    return this.scamInfoRepository.find(filter);
  }

  @patch('/scam-infos', {
    responses: {
      '200': {
        description: 'ScamInfo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScamInfo, {partial: true}),
        },
      },
    })
    scamInfo: ScamInfo,
    @param.query.object('where', getWhereSchemaFor(ScamInfo)) where?: Where<ScamInfo>,
  ): Promise<Count> {
    return this.scamInfoRepository.updateAll(scamInfo, where);
  }

  @get('/scam-infos/{id}', {
    responses: {
      '200': {
        description: 'ScamInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ScamInfo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(ScamInfo)) filter?: Filter<ScamInfo>
  ): Promise<ScamInfo> {
    return this.scamInfoRepository.findById(id, filter);
  }

  @patch('/scam-infos/{id}', {
    responses: {
      '204': {
        description: 'ScamInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScamInfo, {partial: true}),
        },
      },
    })
    scamInfo: ScamInfo,
  ): Promise<void> {
    await this.scamInfoRepository.updateById(id, scamInfo);
  }

  @put('/scam-infos/{id}', {
    responses: {
      '204': {
        description: 'ScamInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() scamInfo: ScamInfo,
  ): Promise<void> {
    await this.scamInfoRepository.replaceById(id, scamInfo);
  }

  @del('/scam-infos/{id}', {
    responses: {
      '204': {
        description: 'ScamInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.scamInfoRepository.deleteById(id);
  }
}
