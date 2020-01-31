import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Places, PlacesRelations, SubPlaces, PlacesPic, ScamInfo} from '../models';
import {PostgresqlDataSourceDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SubPlacesRepository} from './sub-places.repository';
import {PlacesPicRepository} from './places-pic.repository';
import {ScamInfoRepository} from './scam-info.repository';

export class PlacesRepository extends DefaultCrudRepository<
  Places,
  typeof Places.prototype.id,
  PlacesRelations
> {

  public readonly subPlaces: HasManyRepositoryFactory<SubPlaces, typeof Places.prototype.id>;

  public readonly placesPics: HasManyRepositoryFactory<PlacesPic, typeof Places.prototype.id>;

  public readonly scamInfos: HasManyRepositoryFactory<ScamInfo, typeof Places.prototype.id>;

  constructor(
    @inject('datasources.PostgresqlDataSource') dataSource: PostgresqlDataSourceDataSource, @repository.getter('SubPlacesRepository') protected subPlacesRepositoryGetter: Getter<SubPlacesRepository>, @repository.getter('PlacesPicRepository') protected placesPicRepositoryGetter: Getter<PlacesPicRepository>, @repository.getter('ScamInfoRepository') protected scamInfoRepositoryGetter: Getter<ScamInfoRepository>,
  ) {
    super(Places, dataSource);
    this.scamInfos = this.createHasManyRepositoryFactoryFor('scamInfos', scamInfoRepositoryGetter,);
    this.registerInclusionResolver('scamInfos', this.scamInfos.inclusionResolver);
    this.placesPics = this.createHasManyRepositoryFactoryFor('placesPics', placesPicRepositoryGetter,);
    this.registerInclusionResolver('placesPics', this.placesPics.inclusionResolver);
    this.subPlaces = this.createHasManyRepositoryFactoryFor('subPlaces', subPlacesRepositoryGetter,);
    this.registerInclusionResolver('subPlaces', this.subPlaces.inclusionResolver);
  }
}
