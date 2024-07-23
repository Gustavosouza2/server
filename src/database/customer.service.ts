import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async customer(
    customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: customerWhereUniqueInput,
    });
  }
  async customers() {
    return this.prisma.customer.findMany();
  }
  async filteredCustomers(searchString: string) {
    return this.prisma.customer.findMany({
      where: {
        OR: [
          {
            name: { contains: searchString, mode: 'insensitive' },
          },
          {
            email: { contains: searchString, mode: 'insensitive' },
          },
        ],
      },
    });
  }

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }

  async updateCustomer(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }): Promise<Customer> {
    const { where, data } = params;
    return this.prisma.customer.update({
      data,
      where,
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
