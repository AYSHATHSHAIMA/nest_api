import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Property } from '../properties/entities/property.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(Property) private propRepo: Repository<Property>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  // Create a booking
  async create(dto: CreateBookingDto) {
    const prop = await this.propRepo.findOne({ where: { id: dto.property_id } });
    if (!prop) throw new NotFoundException('Property not found');
    if (prop.is_booked) throw new BadRequestException('Property already booked');

    const user = await this.userRepo.findOne({ where: { id: Number(dto.user_id) } });
    if (!user) throw new NotFoundException('User not found');

    const booking = this.bookingRepo.create({
      booking_date: dto.booking_date,
      persons: dto.persons,
      user,
      property: prop,
    } as any);

    const savedBooking = await this.bookingRepo.save(booking);

    prop.is_booked = true;
    await this.propRepo.save(prop);

    return savedBooking;
  }

 
  findAll() {
    return this.bookingRepo.find({
      relations: ['user', 'property'],
      order: { created_at: 'DESC' },
    });
  }

  findByUser(userId: number) {
    return this.bookingRepo.find({
      where: { user: { id: userId } },
      relations: ['property'],
      order: { created_at: 'DESC' },
    });
  }

  
  async remove(id: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!booking) throw new NotFoundException('Booking not found');


    if (booking.property) {
      booking.property.is_booked = false;
      await this.propRepo.save(booking.property);
    }

    return this.bookingRepo.remove(booking);
  }
}
