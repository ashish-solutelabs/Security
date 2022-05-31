import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthInput } from './dto/Signup-auth.input';
import { LoginAuthInput } from './dto/login-auth.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './entities/role.enum';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService:JwtService,
  ){}

  
  async signup(signupAuthInput: SignupAuthInput) {
    const { email, password } = signupAuthInput;     
        const dublicateEmail = await this.userRepository.findOne({email});
    
        if(dublicateEmail){
          throw new ConflictException("dublicate email found")
        }

        const user = new User();

        user.firstname=signupAuthInput.firstname
        user.lastname=signupAuthInput.lastname
        user.email = email;
        user.role = signupAuthInput.role?signupAuthInput.role:Role.USER

        user.password = await bcrypt.hash(password,10);

        return await this.userRepository.save(user);   
 
  }

  async login(loginAuthInput:LoginAuthInput) :Promise<{accessToken:string}>{
    // console.log(loginAuthInput)
    const result  =  await this.validateUserPassword(loginAuthInput.email,loginAuthInput.password)

        if (!result) {
             throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = this.jwtService.sign({
          email:result.email,
          sub:result.id
        });
        
        return {accessToken}
  }

  async validateUserPassword(email: string,password:string): Promise<any> {
    const user = await this.userRepository.findOne({ email });
    // console.log(user)
    if (user && await bcrypt.hash(password,10)) {
      const {password , ...result} = user
      return result;
    } else {
      return null;
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    // return this.users.find(user => user.username === username);
    return this.userRepository.findOne(id);
  }
}

