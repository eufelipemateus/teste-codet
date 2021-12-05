import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entity/content.entity';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private contentsRepository: Repository<Content>,
  ) {}

  create(content: Content) {
    return this.contentsRepository.create(content);
  }

  findAll(): Promise<Content[]> {
    return this.contentsRepository.find();
  }

  findOne(id: string): Promise<Content> {
    return this.contentsRepository.findOne(id);
  }

  async update(id: number, data: Content): Promise<Content> {
    await this.contentsRepository.update({ id }, data);
    return await this.contentsRepository.findOne({ id });
  }

  async remove(id: string): Promise<void> {
    await this.contentsRepository.delete(id);
  }
}
