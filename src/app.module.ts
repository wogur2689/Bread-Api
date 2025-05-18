import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './web/users/module/users.module';
import { MenuModule } from './web/menu/module/menu.module';
import { DatabaseModule } from './database/database.module';
import { Subscriber } from 'rxjs';
import { ProductModule } from './web/product/module/product.module';

@Module({
  imports: [DatabaseModule, UsersModule, MenuModule, ProductModule],
  controllers: [AppController],
  providers: [Subscriber]
})
export class AppModule {}
