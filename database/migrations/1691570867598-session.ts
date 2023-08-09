import { MigrationInterface, QueryRunner } from "typeorm"

export class Session1691570867598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE session (
                id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                access_token VARCHAR(255),
                scope JSON,
                user_agent VARCHAR(255),
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS session `);
    }

}
