import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      user_name: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      user_name: 'maria',
      password: 'guess',
    },
  ];
}