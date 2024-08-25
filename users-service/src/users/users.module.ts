import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User],
      synchronize:true,
      logging:true
    }),
    TypeOrmModule.forFeature([User]),JwtModule.register({
    secret: process.env.SENHA_JWT, 
    signOptions: { expiresIn: process.env.EXPIRE_TOKEN }, 
  }),],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
