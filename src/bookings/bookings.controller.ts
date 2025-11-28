import { Controller, Post, Body, Get, Query, Delete, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingservice: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingservice.create(dto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) return this.bookingservice.findByUser(Number(userId));
    return this.bookingservice.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingservice.remove(id);
  }
}
