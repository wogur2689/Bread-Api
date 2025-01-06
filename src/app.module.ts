import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './web/users/module/users.module';
import { MenuModule } from './web/menu/module/menu.module';
import { DatabaseModule } from './database/database.module';
import { Subscriber } from 'rxjs';

@Module({
  imports: [DatabaseModule, UsersModule, MenuModule, DatabaseModule],
  controllers: [AppController],
  providers: [Subscriber]
})
export class AppModule {}
