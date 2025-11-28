import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsNumber()
  @Min(1)
  @Max(4)
  capacity: number;

  @IsString()
  description?: string;
    image: any;
}
