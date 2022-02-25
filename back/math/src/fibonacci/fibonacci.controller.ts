import { Controller } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MessagePattern } from '@nestjs/microservices';

@Controller('fibonacci')
export class FibonacciController {
  constructor(
    @InjectQueue('fibonacci') private readonly fibonacciQueue: Queue,
  ) {}

  @MessagePattern('doMath')
  async doMath(n: number): Promise<number> {
    const job = await this.fibonacciQueue.add(n);
    const result = await job.finished()
    return result;
  }
}
