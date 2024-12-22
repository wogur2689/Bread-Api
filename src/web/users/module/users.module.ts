import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../service/users.service';
import { LocalStrategy } from '../local.strategy';
import { SessionSerializer } from '../session.serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PassportModule.register({ session: true })],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, SessionSerializer]
})
export class UsersModule {}
