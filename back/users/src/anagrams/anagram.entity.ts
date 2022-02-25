import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('anagram', {
  schema: 'public',
})
@ObjectType()
export default class Anagram {
  @Field(_ => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    unique: true,
  })
  user_id: number;

  @Field()
  @Column()
  anagram_map: string;
}
