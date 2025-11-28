import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

 
  findAll() {
    return this.userRepo.find({ order: { id: 'ASC' } });
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) 
        throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async create(dto: CreateUserDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already registered');

    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findById(id);
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

 
  async delete(id: number) {
    const user = await this.findById(id);
    return this.userRepo.remove(user);
  }
}
