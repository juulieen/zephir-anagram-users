import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async create(user: Omit<User, 'id'>) {
    if (await this.usersRepository.findOne({ email: user.email })) {
      throw new BadRequestException('User already exists');
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.remove(user);
  }
}
