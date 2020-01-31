import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Country, CountryRelations, Places} from '../models';
import {PostgresqlDataSourceDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PlacesRepository} from './places.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {

  public readonly places: HasManyRepositoryFactory<Places, typeof Country.prototype.id>;

  constructor(
    @inject('datasources.PostgresqlDataSource') dataSource: PostgresqlDataSourceDataSource, @repository.getter('PlacesRepository') protected placesRepositoryGetter: Getter<PlacesRepository>,
  ) {
    super(Country, dataSource);
    this.places = this.createHasManyRepositoryFactoryFor('places', placesRepositoryGetter,);
    this.registerInclusionResolver('places', this.places.inclusionResolver);
  }
}
