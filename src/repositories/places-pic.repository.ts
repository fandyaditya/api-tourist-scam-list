import {DefaultCrudRepository} from '@loopback/repository';
import {PlacesPic, PlacesPicRelations} from '../models';
import {PostgresqlDataSourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlacesPicRepository extends DefaultCrudRepository<
  PlacesPic,
  typeof PlacesPic.prototype.id,
  PlacesPicRelations
> {
  constructor(
    @inject('datasources.PostgresqlDataSource') dataSource: PostgresqlDataSourceDataSource,
  ) {
    super(PlacesPic, dataSource);
  }
}
