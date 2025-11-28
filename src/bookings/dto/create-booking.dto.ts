import { IsUUID, IsDateString, IsInt, Min } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  property_id: string;

  @IsDateString()
  booking_date: string;

  @IsInt()
  @Min(1)
  persons: number;
}
