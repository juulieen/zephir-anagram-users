import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class newUserInput {
  @Field()
  @IsEmail()
  email: string;
}
