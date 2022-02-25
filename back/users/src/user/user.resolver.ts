import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { firstValueFrom } from 'rxjs';
import { newUserInput } from './dto/newUserInput.dto';
import User from './user.entity';
import { UserService } from './user.service';

const pubSub = new PubSub();

function getRandomNumber(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min);
}

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly UserService: UserService,
    @Inject('MATH_SERVICE') private readonly MathService: ClientProxy,
    @Inject('ANAGRAMS_SERVICE') private readonly AnagramsService: ClientProxy,
  ) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.UserService.findOne(parseInt(id, 10));
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.UserService.findAll();
  }

  @Mutation(() => User)
  async addUser(
    @Args('newUserData')
    newUserData: newUserInput,
  ): Promise<User> {
    if (!newUserData.email.endsWith('@zephir.fr')) {
      throw new BadRequestException('Email must end with @zephir.fr');
    }

    const fib = (
      (await firstValueFrom(
        this.MathService.send('doMath', getRandomNumber(50, 51)),
      )) as number
    ).toString();

    const user = await this.UserService.create({
      email: newUserData.email,
      fib: fib,
    });
    const anagramsMap = await firstValueFrom(
      this.AnagramsService.send('createAnagrams', {
        nbWord: 6,
        userId: user.id,
      }),
    );

    pubSub.publish('userAdded', { userAdded: user });
    return user;
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string): Promise<Boolean> {
    await this.UserService.remove(parseInt(id, 10));
    pubSub.publish('userDeleted', { userIdDeleted: id });
    return true;
  }

  @Subscription(() => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
