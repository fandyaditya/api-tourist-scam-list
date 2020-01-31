import {DefaultCrudRepository} from '@loopback/repository';
import {ScamInfo, ScamInfoRelations} from '../models';
import {PostgresqlDataSourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ScamInfoRepository extends DefaultCrudRepository<
  ScamInfo,
  typeof ScamInfo.prototype.id,
  ScamInfoRelations
> {
  constructor(
    @inject('datasources.PostgresqlDataSource') dataSource: PostgresqlDataSourceDataSource,
  ) {
    super(ScamInfo, dataSource);
  }
}
