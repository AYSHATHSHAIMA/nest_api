import { Controller, Get, Post, Body, Param, Put, Delete, Query, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dtto';

@Controller('properties')
export class PropertiesController {
  constructor(private service: PropertiesService) {}

   @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name = `${Date.now()}${extname(file.originalname)}`;
        cb(null, name);
      },
    }),
  }))
  create(@Body() dto: CreatePropertyDto, @UploadedFile() image: any) {
    if (image) {
      dto.image = image.filename; 
    }
    return this.service.create(dto);
  }


  
  @Get()
  findAllProperties(@Query('approved') approved?: string, @Query('is_booked') is_booked?: string) {
    const filters: any = {};
    if (approved !== undefined) filters.approved = approved === 'true';
    if (is_booked !== undefined) filters.is_booked = is_booked === 'true';
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOneProperty(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  updateProperty(@Param('id') id: string, @Body() dto: UpdatePropertyDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/approve')
  approveProperty(@Param('id') id: string) {
    return this.service.update(id, { approved: true } );
  }

  @Delete(':id')
  removeProperty(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
