import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const tablePrefix = this.configService.get('database.prefix') || 'wp_';
    return {
      type: 'mysql',
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      username: this.configService.get('database.username'),
      password: this.configService.get('database.password'),
      database: this.configService.get('database.name'),
      synchronize: this.configService.get('database.synchronize'),
      dropSchema: false,
      keepConnectionAlive: false,
      logging: this.configService.get('app.nodeEnv') !== 'production',
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      entityPrefix: tablePrefix,
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
      ssl: this.configService.get('database.sslEnabled')
        ? {
            ca: __dirname + '/certs/rds-combined-ca-bundle.pem',
          }
        : undefined,
      extra: {
        authPlugin: 'caching_sha2_password',
      },
      driver: require('mysql2'),
    } as MysqlConnectionOptions;
  }
}
