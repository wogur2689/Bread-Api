import { Module } from '@nestjs/common';
import { PaymentController } from '../controller/payment.controller';
import { PaymentService } from '../service/payment.service';
import { Transaction } from '../entity/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService] // 다른 모듈에서 사용할 수 있도록 export
})
export class PaymentModule {}
