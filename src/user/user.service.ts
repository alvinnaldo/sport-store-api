import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      user_id: uuidv4(),
      password: hashedPassword,
    });
    await newUser.save();
    const deletedPassUser = await this.findOne(newUser.user_id);
    return deletedPassUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find({}, { password: 0, _id: 0 });
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne(
      { user_id: id },
      { password: 0, _id: 0 },
    );
    return user;
  }

  async update(id: string, updateProductDto: UpdateUserDto): Promise<User> {
    if (updateProductDto.password) {
      const hashedPassword = await bcrypt.hash(updateProductDto.password, 10);
      await this.userModel.findOneAndUpdate(
        { user_id: id },
        { ...updateProductDto, password: hashedPassword },
      );
    } else {
      await this.userModel.findOneAndUpdate({ user_id: id }, updateProductDto);
    }
    const modifiedUser = await this.userModel.findOne(
      { user_id: id },
      { password: 0, _id: 0 },
    );
    delete modifiedUser['password'];
    return modifiedUser;
  }

  async remove(id: string): Promise<string> {
    await this.userModel.findOneAndDelete({ user_id: id });
    return `User with user_id ${id} is deleted`;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email }, { password: 1, user_id: 1 });
    return user;
  }
}
