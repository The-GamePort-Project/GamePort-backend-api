import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserModel } from 'src/modules/user/models/user.model';
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    console.log('CurrentUser decorator called');
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: { user: UserModel } }>().req;
    return request.user;
  },
);
