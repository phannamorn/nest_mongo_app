import {
  Injectable,
  CanActivate,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';

@Injectable()
export class AgeCheckMiddleware implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const age = request.query.age;
    if (age < 18) {
      throw new UnauthorizedException(
        'You are not old enough to request this API. The minimum age is 18 years old.',
      );
    }

    return true;
  }
}
