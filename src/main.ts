import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CORS
  app.enableCors({
    origin: 'http://localhost:3000', // 또는 특정 도메인: 'http://localhost:3000'
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  //세션 미들웨어 추가
  app.use(
    session({
      secret: "a12345", //세션 암호화 키
      resave: false, //세션 데이터가 변경되지 않아도 다시 저장할지 여부
      saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
      cookie: {
        maxAge: 3600000, // 쿠키 유효기간 (밀리초)
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS 사용시 true
      },
    })
  )

  //swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API 문서 제목')
    .setDescription('API 문서 설명')
    .setVersion('1.0')
    .addTag('태그') // 선택사항
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document); // http://localhost:3000/api-docs

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
