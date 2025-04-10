import { Module } from '@nestjs/common';
import { MenuController } from '../controller/menu.controller';
import { MenuService } from '../service/menu.service';
import { Menu } from '../entity/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Menu])],
    controllers: [MenuController],
    providers: [MenuService]
})
export class MenuModule {}
