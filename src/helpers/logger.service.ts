import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

@Injectable()
export class LoggingService implements LoggerService {
  constructor() {
    this.fileExist(this.pathToLogs);
  }

  private readonly consoleLogger = new ConsoleLogger();

  private pathToLogs = path.resolve(process.cwd(), 'logs');
  private currentNameFile: string = Date.now().toString();
  private pathToLogFile = path.resolve(
    this.pathToLogs,
    `${this.currentNameFile}.log`,
  );
  private readonly MAX_SIZE: number = +process.env.MAX_LOG_SIZE || 200;
  private logStream: fs.WriteStream = fs.createWriteStream(this.pathToLogFile, {
    flags: 'a',
  });

  log(message: string) {
    this.consoleLogger.log(message);
    this.writeLogsToFile(message);
  }

  error(message: string) {
    this.consoleLogger.error(message);
    this.writeLogsToFile(message);
  }
  warn(message: string) {
    this.consoleLogger.warn(message);
    this.writeLogsToFile(message);
  }

  private writeLogsToFile(message: string) {
    this.fileExist(this.pathToLogs);

    const { size } = fs.statSync(this.pathToLogFile);

    if (size / 1024 > this.MAX_SIZE) {
      this.currentNameFile = Date.now().toString();

      this.logStream.end();

      this.pathToLogFile = path.resolve(
        this.pathToLogs,
        `${this.currentNameFile}.log`,
      );

      this.logStream = fs.createWriteStream(this.pathToLogFile, { flags: 'a' });
    }
    this.logStream.write(message + '\n');
    this.consoleLogger.log(message);
  }

  private fileExist(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }
}
