import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { productDto } from '../dto/product.dto';
import { ApiRes, createApiDataRes } from 'src/common/api/apiResponse';
import { ApiResCode } from 'src/common/api/apiResCode';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    //productList
    @Get('list')
    @ApiOperation({ summary: '상품 목록 조회' })
    @ApiResponse({ status: 200, description: '성공적으로 상품 목록 반환' })
    async productList() : Promise<ApiRes<any>>  {
        const result : productDto[] = await this.productService.productList();
        return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
    }

    //productDetail
    @Get('detail')
    @ApiOperation({ summary: '상품 상세 정보 조회' })
    @ApiResponse({ status: 200, description: '성공적으로 상품 상세 정보 반환' })
    async productDetail(@Query() productDto: productDto): Promise<ApiRes<any>> {
        const result : productDto = await this.productService.productDetail(productDto);
        return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
    }
}
