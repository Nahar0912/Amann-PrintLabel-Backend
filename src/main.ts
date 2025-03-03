import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use Cookie Parser Middleware
  app.use(cookieParser());

  // Enable CORS with dynamic origin handling
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:5173'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Listen on the defined port, defaulting to 3000
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Graceful shutdown handling
  process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await app.close();
    process.exit(0);
  });
}

bootstrap();
