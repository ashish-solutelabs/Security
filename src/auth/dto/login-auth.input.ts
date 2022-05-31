import { SignupAuthInput } from './Signup-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginAuthInput extends PartialType(SignupAuthInput) {
    

  @Field()
  @IsEmail()
  email:string

  @Field()
  @IsString()
  password:string
}
