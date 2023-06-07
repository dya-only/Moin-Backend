import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class OrmConfigProvider implements TypeOrmOptionsFactory {
  static createTypeOrmOptions: (...args: any[]) => TypeOrmModuleOptions | Promise<TypeOrmModuleOptions>;
  constructor( private configService: ConfigService ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mariadb',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASS'),
      database: this.configService.get('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity.ts'],
      synchronize: true
    }
  }
}