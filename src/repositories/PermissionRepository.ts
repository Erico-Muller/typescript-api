import { EntityRepository, Repository } from 'typeorm'
import { Permissions } from '../models/Permissions'

@EntityRepository(Permissions)
class PermissionRepository extends Repository<Permissions>{}

export { PermissionRepository }