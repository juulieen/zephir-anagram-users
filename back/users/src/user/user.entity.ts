import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', {
  schema: 'public',
})
@ObjectType()
export default class User {
  @Field(_ => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    unique: true,
  })
  email: string;

  @Field()
  @Column()
  fib: string;
}
