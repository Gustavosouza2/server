import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateCustomerDto {
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

  @IsOptional()
  created_at: string;

  @IsOptional()
  updated_at: string;
}
