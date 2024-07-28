import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async customers(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }
  async findCustomerById(id: string): Promise<Customer> {
    return await this.prisma.customer.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findCustomerByName(nameToBeMatched: string): Promise<Customer[]> {
    return nameToBeMatched
      ? this.prisma.customer.findMany({
          where: {
            name: {
              contains: nameToBeMatched,
              mode: 'insensitive',
            },
          },
        })
      : this.prisma.customer.findMany();
  }

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return await this.prisma.customer.create({
      data,
    });
  }

  async updateCustomer(id: string, data: Customer): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }
  async patchCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async deleteCustomer(
    where: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer> {
    return this.prisma.customer.delete({
      where,
    });
  }
}
