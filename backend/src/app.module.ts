import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UnitsModule } from './units/units.module';
import { KindidentityModule } from './kindidentity/kindidentity.module';
import { PersonModule } from './person/person.module';
import { KindmovementsModule } from './kindmovements/kindmovements.module';
import { MovementsModule } from './movements/movements.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    ProductsModule,
    UnitsModule,
    KindidentityModule,
    PersonModule,
    KindmovementsModule,
    MovementsModule,
    UsersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
