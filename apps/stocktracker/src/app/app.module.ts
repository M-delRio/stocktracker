import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { StocksModule } from './stocks/stocks.module'
import { User } from './users/entities/user.entity'

@Module({
  imports: [
    UsersModule,
    StocksModule,
    TypeOrmModule.forRoot({
      // url: 'mongodb://localhost:27017',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      // username: 'root',
      // password: 'root',
      database: 'test',
      autoLoadEntities: true,
      // entities: [User],
      // synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
