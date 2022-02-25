import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('anagram', {
  schema: 'public',
})
export default class Anagram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  user_id: string;

  @Column()
  anagram_map: string;
}
