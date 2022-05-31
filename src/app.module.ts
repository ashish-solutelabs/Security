import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [PassportModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile:join(process.cwd(),'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: '*',
        credentials: true,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 2,
    }), 

    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST, 
      port: +process.env.DATABASE_PORT, 
      username: process.env.DATABASE_USER, 
      password: process.env.DATABASE_PASSWORD, 
      database: process.env.DATABASE_NAME,
      entities: [User,Product], 
      synchronize: true,
    }),
    AuthModule,
    ProductModule,   
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
