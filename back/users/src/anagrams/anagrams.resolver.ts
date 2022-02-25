import {NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import Anagram from './anagram.entity';
import { AnagramsService } from './anagrams.service';

@Resolver(() => Anagram)
export class AnagramsResolver {
  constructor(
    private readonly UserService: AnagramsService,
  ) {}

  @Query(() => Anagram)
  async user(@Args('id') id: string): Promise<Anagram> {
    const user = await this.UserService.findOne(parseInt(id, 10));
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

}
