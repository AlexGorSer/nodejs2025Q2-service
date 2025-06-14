import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, query, body } = req;
    const logTime = new Date().toLocaleString();

    const messageToLog = `Time: ${logTime}, Url: ${JSON.stringify(originalUrl)} Query: ${JSON.stringify(query)} Body: ${JSON.stringify(body)}, Status: ${res.statusCode}`;

    this.loggingService.log(messageToLog);
    next();
  }
}
