import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateCustomerRequestBody {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty({
    message: 'The customer name cannot be empty',
  })
  @Length(0, 12)
  name: string;

  @IsOptional()
  email: string;

  @IsNotEmpty()
  amount: number;
}
