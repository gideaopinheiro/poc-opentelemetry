import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startInstrumentation } from './instrumentation';

async function bootstrap() {
  startInstrumentation();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  await app.listen(port);
  console.log(`Listening at http://localhost:${port}`)
}
bootstrap();
