import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { PrismaService } from './database/prisma.service';
import { CustomerService } from './database/customer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, CustomerService],
})
export class AppModule {}
