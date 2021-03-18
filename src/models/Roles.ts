import { Entity, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'


@Entity('roles')
class Roles {

    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    description: string


    constructor(){
        if(!this.id)
            this.id = uuid()
    }

}


export { Roles }