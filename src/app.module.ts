import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { BookingsModule } from './bookings/bookings.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: process.env.SYNCHRONIZE === 'true',
  ssl: { rejectUnauthorized: false }, // Required for Render
}),
    UsersModule,
    PropertiesModule,
    BookingsModule,
  ],
})
export class AppModule {}
