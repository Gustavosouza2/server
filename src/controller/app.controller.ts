import {
  NotFoundException,
  Controller,
  Delete,
  Query,
  Patch,
  Param,
  Post,
  Body,
  Get,
  Put,
} from '@nestjs/common';
import { Customer, Customer as CustomerModel } from '@prisma/client';

import { CustomerService } from 'src/database/customer.service';
import { CreateCustomerDto } from 'src/dtos/CreateCustomerDto';

@Controller('app')
export class AppController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('customers')
  async getAllCustomers(): Promise<CustomerModel[]> {
    return this.customerService.customers();
  }
  @Get('customer/:id')
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findCustomerById(id);
  }

  @Get('filtered-customers')
  async getCustomerByName(@Query('name') name: string): Promise<Customer[]> {
    return this.customerService.findCustomerByName(name);
  }

  @Post('create')
  async createCustomer(
    @Body()
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Put('customer/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateData: Customer,
  ): Promise<Customer> {
    const customer = await this.customerService.findCustomerById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return this.customerService.updateCustomer(id, updateData);
  }

  @Patch('customer/:id')
  async patchCustomer(
    @Param('id') id: string,
    @Body() patchData: Partial<Customer>,
  ): Promise<Customer> {
    const customer = await this.customerService.findCustomerById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return this.customerService.patchCustomer(id, patchData);
  }

  @Delete('customer/:id')
  async deleteCustomer(@Param('id') id: string): Promise<CustomerModel> {
    return this.customerService.deleteCustomer({ id: id });
  }
}
