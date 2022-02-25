import { Module } from '@nestjs/common';
import { join } from 'path';
import { BullModule } from '@nestjs/bull';
import { FibonacciController } from './fibonacci.controller';


@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fibonacci',
      processors: [join(__dirname, 'fibonacci.processor.js')],
    }),
  ],
  controllers: [FibonacciController],
  providers: [],
})
export class FibonacciModule {}
