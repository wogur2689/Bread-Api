import { Controller, Get } from '@nestjs/common';
import { MenuService } from '../service/menu.service';
import { menuDto } from '../dto/menu.dto';
import { ApiResponse, createApiDataResponse } from 'src/common/api/apiResponse';
import { ApiResCode } from 'src/common/api/apiResCode';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    //menuList
    @Get('menuList')
    async menuList() : Promise<ApiResponse<any>>  {
        const result : menuDto[] = await this.menuService.menuList();
        return createApiDataResponse(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
    }
}
