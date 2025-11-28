import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dtto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propRepo: Repository<Property>,
  ) {}

  create(dto: CreatePropertyDto) {
    const p = this.propRepo.create(dto);
    return this.propRepo.save(p);
  }

  
  async findAll(filters?: { approved?: boolean; is_booked?: boolean }) {
    let properties = await this.propRepo.find(); 

    if (filters?.approved !== undefined) {
      properties = properties.filter(p => p.approved === filters.approved);
    }

    if (filters?.is_booked !== undefined) {
      properties = properties.filter(p => p.is_booked === filters.is_booked);
    }

    return properties;
  }

  async findOne(id: string) {
    const p = await this.propRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Property not found');
    return p;
  }

  async update(id: string, dto: UpdatePropertyDto) {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    return this.propRepo.save(p);
  }

  async remove(id: string) {
    const p = await this.findOne(id);
    return this.propRepo.remove(p);
  }

  async markBooked(id: string, booked: boolean) {
    await this.propRepo.update({ id }, { is_booked: booked });
  }
}
