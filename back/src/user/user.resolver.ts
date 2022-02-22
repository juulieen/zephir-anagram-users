import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { newUserInput } from './dto/newUserInput.dto';
import User from './user.entity';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly UserService: UserService) {}

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
  async addUser(@Args('newUserData') newUserData: newUserInput): Promise<User> {
    const user = await this.UserService.create({
      email: newUserData.email,
      // TODO add generation of fib number
      fib: 1,
    });
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
