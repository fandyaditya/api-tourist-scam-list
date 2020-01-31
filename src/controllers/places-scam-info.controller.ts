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
  ScamInfo,
} from '../models';
import {PlacesRepository} from '../repositories';

export class PlacesScamInfoController {
  constructor(
    @repository(PlacesRepository) protected placesRepository: PlacesRepository,
  ) { }

  @get('/places/{id}/scam-infos', {
    responses: {
      '200': {
        description: 'Array of Places has many ScamInfo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ScamInfo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ScamInfo>,
  ): Promise<ScamInfo[]> {
    return this.placesRepository.scamInfos(id).find(filter);
  }

  @post('/places/{id}/scam-infos', {
    responses: {
      '200': {
        description: 'Places model instance',
        content: {'application/json': {schema: getModelSchemaRef(ScamInfo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Places.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScamInfo, {
            title: 'NewScamInfoInPlaces',
            exclude: ['id'],
            optional: ['placesId']
          }),
        },
      },
    }) scamInfo: Omit<ScamInfo, 'id'>,
  ): Promise<ScamInfo> {
    return this.placesRepository.scamInfos(id).create(scamInfo);
  }

  @patch('/places/{id}/scam-infos', {
    responses: {
      '200': {
        description: 'Places.ScamInfo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScamInfo, {partial: true}),
        },
      },
    })
    scamInfo: Partial<ScamInfo>,
    @param.query.object('where', getWhereSchemaFor(ScamInfo)) where?: Where<ScamInfo>,
  ): Promise<Count> {
    return this.placesRepository.scamInfos(id).patch(scamInfo, where);
  }

  @del('/places/{id}/scam-infos', {
    responses: {
      '200': {
        description: 'Places.ScamInfo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ScamInfo)) where?: Where<ScamInfo>,
  ): Promise<Count> {
    return this.placesRepository.scamInfos(id).delete(where);
  }
}
