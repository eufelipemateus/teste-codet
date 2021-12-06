import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Content } from '../entity/content.entity';
import { ContentsService } from './content';
import { CreateContentDto } from './dto/create-content.dto';

import fs = require('fs');
import path = require('path');

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async create(
    @Body() createContentDto: CreateContentDto,
    @UploadedFile() file,
    @Res() response,
  ) {
   // console.error(createContentDto, file);

   // Rename the file
    const myArray = file.originalname.split('.');

    const path0 = path.join(file.destination, file.filename);

    const path1 = path.join(file.destination, `${file.filename}.${myArray[1]}`);

    //console.log(path0, path1);
    fs.renameSync(path0, path1);

    // prepare data
    const data = {
      title: createContentDto.title,
      year: createContentDto.year,
      duration: createContentDto.duration,
      file: path1,
      file_type: file.mimetype,
      public_url: '',
    } as unknown as Content;
    try {
      // Save Contend in db
      const content = await this.contentService.create(data);
      // console.log(content)

      // Put file url
      content.public_url = `${process.env.APP_URL}/content/view/${content.id}`;
      //content.public_url = `https://localhost:3000/view/${content.id}`;
      const dbContent = await this.contentService.update(content.id, content);

      // console.log(dbContent)
      return response.status(200).json(dbContent)
    } catch (e) {
      return response.status(500).json('Error ao tentar salvar');
    }
  }

  @Get('/getAll')
  getAll(): Promise<Content[]> {
    return this.contentService.findAll();
  }

  @Get('/view/:id')
  async getVideo(@Param('id') id: string, @Res() res) {
    const content = await this.contentService.findOne(id);

    // name to donwload
    const arrayFile = content.file.split('.');
    const myName = `content-${content.id}.${arrayFile[1]}`

    // type file
    res.set("Content-Type", content.file_type);
    //res.set('Content-Disposition', `attachment; filename=${myName}`)

    const file = fs.createReadStream(content.file);
    file.pipe(res);

  }
}
