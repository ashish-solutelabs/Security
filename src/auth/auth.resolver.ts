import { SetMetadata, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginAuthInput } from './dto/login-auth.input';
import { LoginResponse } from './dto/login-response';
import { SignupAuthInput } from './dto/Signup-auth.input';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Roles } from './guard/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { GqlThrottlerGuard } from './guard/throttler.guard';

@Resolver(() => User)

export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
 
  Signup(@Args('signupAuthInput') signupAuthInput: SignupAuthInput) {
    return this.authService.signup(signupAuthInput);
  }

  @UseGuards(GqlThrottlerGuard)
  @Mutation(() => LoginResponse)
  Login(@Args('loginAuthInput') loginAuthInput:LoginAuthInput){
    console.log(loginAuthInput)
    return this.authService.login(loginAuthInput);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Query(() => [User], { name: 'User' })
  findAll() {
    return this.authService.findAll();
  }


}
