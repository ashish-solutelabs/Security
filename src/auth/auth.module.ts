import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './guard/local.strategy';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './guard/jwt.strategy';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
          PassportModule.register({defaultStrategy:'jwt'}),
          JwtModule.register({
                secret: "solute85",
                signOptions: { expiresIn: '3600s' },
              }),
          PassportModule
  ],
  providers: [AuthResolver, AuthService,LocalStrategy,JwtStrategy,RolesGuard],
  exports:[JwtStrategy,PassportModule]

})


export class AuthModule {}
