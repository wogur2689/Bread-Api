import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: "mysql", // 데이터베이스 타입
        host: process.env.DB_HOST, // 호스트
        port: Number(process.env.DB_PORT), // 포트
        username: process.env.DB_USER, // 사용자 이름
        password: process.env.DB_PASS, // 비밀번호
        database: process.env.DB_NAME, // 데이터베이스 이름
        autoLoadEntities: false, // 엔티티 자동 로드
        synchronize: true, // 개발 중에만 true
      }),
    ],
    exports: [TypeOrmModule], // 다른 모듈에서 사용 가능하도록 내보냄
  })
export class DatabaseModule {}
