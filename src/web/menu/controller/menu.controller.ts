import { Controller, Get, Req, Res } from '@nestjs/common';
import { MenuService } from '../service/menu.service';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    //menuList
    @Get('menuList')
    menuList(@Req() req, @Res() res) {
        res.status(200).json(this.menuService.menuList());
    }
}
