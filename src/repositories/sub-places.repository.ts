import {DefaultCrudRepository} from '@loopback/repository';
import {SubPlaces, SubPlacesRelations} from '../models';
import {PostgresqlDataSourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SubPlacesRepository extends DefaultCrudRepository<
  SubPlaces,
  typeof SubPlaces.prototype.id,
  SubPlacesRelations
> {
  constructor(
    @inject('datasources.PostgresqlDataSource') dataSource: PostgresqlDataSourceDataSource,
  ) {
    super(SubPlaces, dataSource);
  }
}
