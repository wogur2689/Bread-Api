import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './web/users/module/users.module';
import { MenuModule } from './web/menu/module/menu.module';

@Module({
  imports: [UsersModule, MenuModule],
  controllers: [AppController]
})
export class AppModule {}
