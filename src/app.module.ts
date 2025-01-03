import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './web/users/module/users.module';
import { MenuModule } from './web/menu/module/menu.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule, MenuModule, DatabaseModule],
  controllers: [AppController]
})
export class AppModule {}
