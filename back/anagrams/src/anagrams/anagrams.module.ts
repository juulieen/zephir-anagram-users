import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AnagramsController } from './anagrams.controller';
import Anagram from './anagrams.entity';
import { AnagramService } from './anagrams.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'create',
      processors: [join(__dirname, 'anagrams.create.processor.js')],
    }),
    BullModule.registerQueue({
      name: 'count',
      processors: [join(__dirname, 'anagrams.count.processor.js')],
    }),
    TypeOrmModule.forFeature([Anagram]),
  ],
  controllers: [AnagramsController],
  providers: [AnagramService]
})
export class AnagramsModule {}
