import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiRes, createApiDataRes } from 'src/common/api/apiResponse';
import { ApiResCode } from 'src/common/api/apiResCode';
import { Faq } from '../entity/faq.entity';
import { FaqService } from '../service/faq.service';

@ApiTags('faq')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get('list')
  @ApiOperation({ summary: '공개 FAQ 목록 조회' })
  async list(): Promise<ApiRes<Faq[]>> {
    const result = await this.faqService.list();
    return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
  }
}
