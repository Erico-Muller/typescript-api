import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersRoles1616177782818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_roles',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid'
                    },
                    {
                        name: 'role_id',
                        type: 'uuid'
                    }
                ],

                foreignKeys: [

                    {
                        name: 'FKUser',
                        referencedTableName: 'roles',
                        referencedColumnNames: ['id'],
                        columnNames: ['role_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'SET NULL'
                    },
                    {
                        name: 'FKRole',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'SET NULL'
                    }

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_roles')
    }

}
