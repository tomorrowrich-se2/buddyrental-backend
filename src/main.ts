import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: true,
  });
  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('BuddyRental')
    .setDescription('The renter of buddies')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 55000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
