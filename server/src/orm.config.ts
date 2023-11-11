import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import 'dotenv/config';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}']
}