import {
  Controller,
  Delete,
  Query,
  Param,
  Post,
  Body,
  Get,
  Put,
} from '@nestjs/common';
import { Customer as CustomerModel } from '@prisma/client';

import { CustomerService } from 'src/database/customer.service';
import { CreateCustomerRequestBody } from 'src/dtos/CustomerBody';

@Controller('app')
export class AppController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('customers')
  async getPublishedPosts(): Promise<CustomerModel[]> {
    return this.customerService.customers();
  }
  @Get('customer/:id')
  async getCustomerById(@Param('id') id: string): Promise<CustomerModel> {
    return this.customerService.customer({ id: id });
  }

  @Get('filtered-customers/:searchString')
  async getFilteredCustomers(
    @Query('searchString') searchString: string,
  ): Promise<CustomerModel[]> {
    return this.customerService.filteredCustomers(searchString);
  }

  @Post('create')
  async createCustomer(
    @Body()
    body: CreateCustomerRequestBody,
  ): Promise<CustomerModel> {
    const { name, id, email, amount } = body;
    return this.customerService.createCustomer({
      name,
      id,
      email,
      amount,
    });
  }

  @Put('customer/:id')
  async publishPost(@Param('id') id: string): Promise<CustomerModel> {
    return this.customerService.updateCustomer({
      where: { id: id },
      data: {},
    });
  }

  @Delete('customer/:id')
  async deleteCustomer(@Param('id') id: string): Promise<CustomerModel> {
    return this.customerService.deleteCustomer({ id: id });
  }
}
