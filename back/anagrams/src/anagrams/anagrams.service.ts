import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Anagram from './anagrams.entity';

@Injectable()
export class AnagramService {
  constructor(
    @InjectRepository(Anagram)
    private AnagramRepository: Repository<Anagram>,
  ) {}

  async findAll() {
    return await this.AnagramRepository.find();
  }

  async findOne(id: number) {
    return await this.AnagramRepository.findOne(id);
  }

  async create(newAnagram: Omit<Anagram, 'id'>) {
    if (await this.AnagramRepository.findOne({ user_id: newAnagram.user_id })) {
      throw new BadRequestException('User already exists');
    }
    return await this.AnagramRepository.save(newAnagram);
  }

  async remove(id: number) {
    const user = await this.AnagramRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Anagram not found');
    }
    return await this.AnagramRepository.remove(user);
  }
}
