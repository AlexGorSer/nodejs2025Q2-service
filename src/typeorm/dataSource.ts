import { DataSource, DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'home-library-data-base',
  port: +process.env.PORT_DATA_BASE | 5432,
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || '12345',
  database: process.env.POSTGRES_DB || 'home-library-db',
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/typeorm/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(config);

export default dataSource;
