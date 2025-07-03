import { Module } from '@nestjs/common';
import { MenuController } from '../controller/cart.controller';
import { MenuService } from '../service/cart.service';
import { Menu } from '../entity/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Menu])],
    controllers: [MenuController],
    providers: [MenuService]
})
export class MenuModule {}
