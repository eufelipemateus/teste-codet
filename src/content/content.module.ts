import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';

import { Content } from '../entity/content.entity';
import { ContentsService } from './content';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  providers: [ContentsService],
  controllers: [ContentController],
})
export class ContentModule {}
