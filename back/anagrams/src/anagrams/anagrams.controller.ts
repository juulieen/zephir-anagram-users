import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AnagramService } from './anagrams.service';

@Controller('anagrams')
export class AnagramsController {
  constructor(
    private readonly AnagramService: AnagramService,
    @InjectQueue('create') private readonly createQueue: Queue,
    @InjectQueue('count') private readonly countQueue: Queue,
  ) {}

  @MessagePattern('createAnagrams')
  async createAnagramsFile({ nbWord, userId }: any) {
    const createFilejob = await this.createQueue.add({ nbWord });
    const fileName = await createFilejob.finished();
    const countJob = await this.countQueue.add({ fileName });
    const countMap = await countJob.finished();
    return this.AnagramService.create({
      anagram_map: countMap,
      user_id: userId,
    });
  }
}
