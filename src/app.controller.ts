import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { metrics, trace } from '@opentelemetry/api';

@Controller()
export class AppController {
  private tracer;
  private meter;
  private readonly counter;
  constructor(private readonly appService: AppService) {
    this.tracer = trace.getTracer('get-task');
    this.meter = metrics.getMeter('POC', '0.1.0');
    this.counter = this.meter.createCounter('get_hello');
  }

  @Get()
  getHello(): string {
    // const span = this.tracer.startSpan('get-tasks');
    // const counter = this.meter.createCounter('poc_number');
    this.counter.add(1);
    const response = this.appService.getHello();
    // span.end();
    return response;
  }
}
