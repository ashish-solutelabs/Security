import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

    constructor(){
        super()
    }
    // getRequest(context: ExecutionContext) {
    //     const ctx = GqlExecutionContext.create(context);
    //     const gqlReq = ctx.getContext().req;
    //     console.log(gqlReq)
    //     if (gqlReq) {
    //       const { variables } = ctx.getArgs();
    //       gqlReq.body = variables;
    //       console.log(gqlReq.body);
    //       return gqlReq;
    //     }
    //     return context.switchToHttp().getRequest();
    //   }

    getRequest(context:ExecutionContext)
    {
        const ctx = GqlExecutionContext.create(context)
        const request = ctx.getContext();
        // console.log(request)
        request.body = ctx.getArgs().loginAuthInput;
        console.log('request:  ',request.body)
        return request;
    }
}