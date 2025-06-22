import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { productDto } from '../dto/product.dto';
import { ApiResponse, createApiDataResponse } from 'src/common/api/apiResponse';
import { ApiResCode } from 'src/common/api/apiResCode';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    //productList
    @Get('list')
    async productList() : Promise<ApiResponse<any>>  {
        const result : productDto[] = await this.productService.productList();
        return createApiDataResponse(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
    }

    //productDetail
    @Get('detail')
    async productDetail(@Query() productDto: productDto): Promise<ApiResponse<any>> {
        const result : productDto = await this.productService.productDetail(productDto);
        return createApiDataResponse(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
    }
}
