import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { metrics, trace } from '@opentelemetry/api';

@Controller()
export class AppController {
  private tracer;
  private meter;
  constructor(private readonly appService: AppService) {
    this.tracer = trace.getTracer('get-task');
    this.meter = metrics.getMeter('POC', '0.1.0');
  }

  @Get()
  getHello(): string {
    const counter = this.meter.createCounter('get_hello');
    counter.add(1);
    // const span = this.tracer.startSpan('get-tasks');
    const response = this.appService.getHello();
    // span.end();
    return response;
  }
}
