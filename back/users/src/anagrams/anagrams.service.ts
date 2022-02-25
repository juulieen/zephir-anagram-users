import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Anagram from './anagram.entity';

@Injectable()
export class AnagramsService {
  constructor(
    @InjectRepository(Anagram)
    private anagramRepository: Repository<Anagram>,
  ) {}

  async findOne(id: number) {
    return await this.anagramRepository.findOne(id);
  }

}
