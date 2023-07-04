import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const userByEmail = await this.userService.findUserByEmail(loginDto.email);
    if (!userByEmail) {
      throw new NotFoundException('Email not found');
    }
    const confirmedPassword = await bcrypt.compare(
      loginDto.password,
      userByEmail.password,
    );
    if (!confirmedPassword) {
      throw new UnauthorizedException(`Password doesn't match`);
    }
    const encryptedProfile = await this.userService.findOne(
      userByEmail.user_id,
    );
    return this.jwtService.sign({ ...encryptedProfile }, { expiresIn: '20m' });
  }
}
