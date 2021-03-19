import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePermissionsRoles1616105275391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'PermissionsRoles',
                columns: [
                    {
                        name: 'permission_id',
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
                        referencedTableName: 'permissions',
                        referencedColumnNames: ['id'],
                        columnNames: ['permission_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'SET NULL'
                    },
                    {
                        name: 'FKSurvey',
                        referencedTableName: 'roles',
                        referencedColumnNames: ['id'],
                        columnNames: ['role_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'SET NULL'
                    }

                ]


            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
