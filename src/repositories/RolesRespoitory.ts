import { EntityRepository, Repository } from 'typeorm'
import { Roles } from '../models/Roles'

@EntityRepository(Roles)
class RoleRepository extends Repository<Roles>{}

export { RoleRepository }