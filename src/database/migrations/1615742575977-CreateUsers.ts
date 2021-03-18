import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1615742575977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'username',
                        type: 'varchar(20)'
                    },
                    {
                        name: 'email',
                        type: 'varchar(30)'
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
