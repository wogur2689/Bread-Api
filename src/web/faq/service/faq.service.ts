import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from '../entity/faq.entity';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {}

  async list(): Promise<Faq[]> {
    return this.faqRepository.find({
      where: { isVisible: true },
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
  }
}
