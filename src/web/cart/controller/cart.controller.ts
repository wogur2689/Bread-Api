import { Controller, Get } from '@nestjs/common';
import { MenuService } from '../service/cart.service';
import { menuDto } from '../dto/cart.dto';
import { ApiRes, createApiDataRes } from 'src/common/api/apiResponse';
import { ApiResCode } from 'src/common/api/apiResCode';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    //menuList
    @Get('list')
    @ApiOperation({ summary: '메뉴 목록 조회' })
    @ApiResponse({ status: 200, description: '성공적으로 메뉴 목록 반환' })
    async menuList() : Promise<ApiRes<any>>  {
        const result : menuDto[] = await this.menuService.menuList();
        return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
    }
}
