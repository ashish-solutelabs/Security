import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { Role } from "../entities/role.enum";



@Injectable()
export class RolesGuard implements CanActivate{
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    console.log("roles : ",roles )
    if (!roles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    console.log("user",user)
    if (!this.matchRoles(roles, user.role)) {
      throw new UnauthorizedException('You are not authorized to access');
    }
    return true;
  }
  matchRoles(roles: string[], userRole: string) {
    return roles.includes(userRole);
  }

} 
