import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Anagram from './anagram.entity';
import { AnagramsResolver } from './anagrams.resolver';
import { AnagramsService } from './anagrams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Anagram])],
  providers: [AnagramsResolver, AnagramsService],
})
export class AnagramsModule {}
