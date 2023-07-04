import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard(new JwtService(), new Reflector())).toBeDefined();
  });
});
