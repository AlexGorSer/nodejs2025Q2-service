import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import { LogLevel } from './enum.helpers';

@Injectable()
export class LoggingService implements LoggerService {
  constructor() {
    this.fileExist(this.pathToLogs);
    this.createStreamsAfterStart();
  }

  private readonly consoleLogger = new ConsoleLogger();
  private readonly logsLevelDef: object = { log: 0, error: 1, warn: 2 };

  private readonly logLevel: number = +process.env.LOG_LEVEL || 2;
  private readonly MAX_SIZE: number = +process.env.MAX_LOG_SIZE || 200;

  private pathToLogs = path.resolve(process.cwd(), 'logs');
  private currentAppNameFile: string = Date.now().toString();
  private currentErrNameFiles: string = Date.now().toString();
  private errorLogStream: fs.WriteStream;
  private appLogStream: fs.WriteStream;

  log(message: string) {
    if (this.logLevelCheck(LogLevel.LOG)) {
      try {
        this.consoleLogger.log(`[${LogLevel.LOG.toUpperCase()}]: ${message}`);
        this.writeAppLogsToFile(`[${LogLevel.LOG.toUpperCase()}]: ${message}`);
      } catch {
        this.appLogStream.end();
        this.errorLogStream.end();
        this.createStreamsAfterStart();
      }
    }
  }

  error(message: string) {
    if (this.logLevelCheck(LogLevel.ERROR)) {
      try {
        this.writeErrorLogsToFile(
          `[${LogLevel.ERROR.toUpperCase()}]: ${message}`,
        );
        this.consoleLogger.error(
          `[${LogLevel.ERROR.toUpperCase()}]: ${message}`,
        );
      } catch {
        this.appLogStream.end();
        this.errorLogStream.end();
        this.createStreamsAfterStart();
      }
    }
  }
  warn(message: string) {
    if (this.logLevelCheck(LogLevel.WARN)) {
      try {
        this.writeAppLogsToFile(`[${LogLevel.WARN.toUpperCase()}]: ${message}`);
        this.consoleLogger.warn(`[${LogLevel.WARN.toUpperCase()}]: ${message}`);
      } catch {
        this.appLogStream.end();
        this.errorLogStream.end();
        this.createStreamsAfterStart();
      }
    }
  }

  private writeAppLogsToFile(message: string) {
    this.fileExist(this.pathToLogs);

    const { size } = fs.statSync(
      path.join(this.pathToLogs, `${this.currentAppNameFile}.app.log`),
    );

    if (size / 1024 > this.MAX_SIZE) {
      this.currentAppNameFile = Date.now().toString();

      this.appLogStream.end();

      this.appLogStream = fs.createWriteStream(
        path.join(this.pathToLogs, `${this.currentAppNameFile}.app.log`),
        { flags: 'a' },
      );
    }
    this.appLogStream.write(message + '\n');
    this.consoleLogger.log(message);
  }

  private writeErrorLogsToFile(message: string) {
    this.fileExist(this.pathToLogs);

    const { size } = fs.statSync(
      path.join(this.pathToLogs, `${this.currentErrNameFiles}.err.log`),
    );

    if (size / 1024 > this.MAX_SIZE) {
      this.currentErrNameFiles = Date.now().toString();

      this.errorLogStream.end();

      this.errorLogStream = fs.createWriteStream(
        path.join(this.pathToLogs, `${this.currentErrNameFiles}.err.log`),
        { flags: 'a' },
      );
    }
    this.errorLogStream.write(message + '\n');
    this.consoleLogger.log(message);
  }

  private createStreamsAfterStart() {
    this.appLogStream = fs.createWriteStream(
      path.join(this.pathToLogs, `${this.currentAppNameFile}.app.log`),
      {
        flags: 'a',
      },
    );
    this.errorLogStream = fs.createWriteStream(
      path.join(this.pathToLogs, `${this.currentAppNameFile}.err.log`),
      {
        flags: 'a',
      },
    );
  }

  private fileExist(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

  private logLevelCheck(level: string) {
    const lvlNumber = this.logsLevelDef[level];
    return lvlNumber <= this.logLevel;
  }
}
