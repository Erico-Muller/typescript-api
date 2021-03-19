import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm'
import { Permissions } from './Permissions'
import { v4 as uuid } from 'uuid'


@Entity('roles')
class Roles {

    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany(() => Permissions)
    @JoinTable({
        name: 'PermissionsRoles',
        joinColumns: [{ name: 'role_id' }],
        inverseJoinColumns: [{ name: 'permission_id' }]
    })
    permissions: Permissions[]


    constructor(){
        if(!this.id)
            this.id = uuid()
    }

}


export { Roles }