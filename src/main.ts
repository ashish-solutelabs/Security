import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(helmet()); 

  app.use(
    session({
        secret: 'your-secret',
        resave: false,
        saveUninitialized: false,
    }),
  );

  // app.use(cookieParser());
  // app.use(csurf());
  
  app.enableCors({  
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  await app.listen(3000);

  console.log(`🚀  Server Application is running on: ${await app.getUrl()}`);

}
bootstrap();
