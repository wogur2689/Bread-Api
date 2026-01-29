import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './web/users/module/users.module';
import { MenuModule } from './web/menu/module/menu.module';
import { DatabaseModule } from './database/database.module';
import { Subscriber } from 'rxjs';
import { ProductModule } from './web/product/module/product.module';
import { PaymentModule } from './web/payment/module/payment.module';

@Module({
  imports: [
    DatabaseModule, 
    UsersModule,
    MenuModule,
    ProductModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [Subscriber]
})
export class AppModule {}
