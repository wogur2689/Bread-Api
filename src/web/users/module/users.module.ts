import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../service/users.service';
import { Users } from '../entity/users.entity';
import { JwtStrategy } from '../jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: 'jwt-secret-key',           // 암호화 키 (추후 .env로 추출)
      signOptions: { expiresIn: '1h' },   // 토큰 만료 시간
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [JwtModule],
})
export class UsersModule {}