import { Entity, PrimaryColumn, Column } from 'typeorm'
import { v4 as uuid } from 'uuid'

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

    constructor(){
        if(!this.id)
            this.id = uuid()
    }

}

export { Users }