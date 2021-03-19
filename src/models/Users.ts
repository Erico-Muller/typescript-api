import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Roles } from './Roles'

@Entity('users')
class Users{

    @PrimaryColumn()
    readonly id: String

    @Column()
    username: String

    @Column()
    email: String

    @Column()
    password: String

    @ManyToMany(() => Roles)
    @JoinTable({
        name: 'users_roles',
        joinColumns: [{ name: 'user_id' }],
        inverseJoinColumns: [{ name: 'role_id' }]
    })
    roles: Roles[]

    constructor(){
        if(!this.id)
            this.id = uuid()
    }

}

export { Users }