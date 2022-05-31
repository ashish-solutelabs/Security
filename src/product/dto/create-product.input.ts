import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateProductInput {

  @Field()
  @IsString()
  p_name:string

  @Field()
  @IsString()
  p_price:string
}
