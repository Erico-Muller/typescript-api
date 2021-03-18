import { Entity, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'


@Entity('permissions')
class Permissions {

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


export { Permissions }