import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { Role } from '../entities/role.enum';

@InputType()
export class SignupAuthInput {
 
  @Field()
  @IsString()
  firstname:string

  @Field()
  @IsString()
  lastname:string

  @Field()
  @IsEmail()
  email:string

  @Field()
  @IsString()
  password:string

  @Field()
  @IsString()
  role?:Role
}
