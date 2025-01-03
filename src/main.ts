import * as session from "express-session";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //세션 미들웨어 추가
  app.use(
    session({
      secret: "a12345", //세션 암호화 키
      resave: false, //세션 데이터가 변경되지 않아도 다시 저장할지 여부
      saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
      cookie: {
        maxAge: 3600000, // 쿠키 유효기간 (밀리초)
      },
    })
  )

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
