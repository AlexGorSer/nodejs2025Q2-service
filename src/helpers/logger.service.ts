import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { LogLevel } from './enum.helpers';
import 'dotenv/config';

@Injectable()
export class LoggingService implements LoggerService {
  constructor() {
    this.fileExist(this.pathToLogs);
    this.createStreamsAfterStart();
  }

  private readonly consoleLogger = new ConsoleLogger();
  private readonly logsLevelDef: object = {
    log: 0,
    error: 1,
    warn: 2,
    debug: 3,
    verbose: 4,
    fatal: 5,
  };

  private readonly logLevel: number | string = process.env.LOG_LEVEL || 2;
  private readonly MAX_SIZE: number | string = process.env.MAX_LOG_SIZE || 200;

  private pathToLogs = path.resolve(process.cwd(), 'logs');
  private currentAppNameFile: string = Date.now().toString();
  private currentErrNameFiles: string = Date.now().toString();
  private errorLogStream: fs.WriteStream;
  private appLogStream: fs.WriteStream;

  log(message: string, context = '') {
    if (this.logLevelCheck(LogLevel.LOG)) {
      try {
        this.consoleLogger.log(
          `[${LogLevel.LOG.toUpperCase()}]:[${context}] ${message}`,
        );
        this.writeAppLogsToFile(
          `[${LogLevel.LOG.toUpperCase()}]:[${context}] ${message}`,
        );
      } catch {
        this.appLogStream.end();
        this.errorLogStream.end();
        this.createStreamsAfterStart();
      }
    }
  }

  error(message: string, context = '', trace?: string) {
    if (this.logLevelCheck(LogLevel.ERROR)) {
      try {
        this.writeErrorLogsToFile(
          `[${LogLevel.ERROR.toUpperCase()}]:[${context}] ${trace}, ${message}`,
        );
        this.consoleLogger.error(
          `[${LogLevel.ERROR.toUpperCase()}]:[${context}] ${trace}, ${message}`,
        );
      } catch {
        this.appLogStream.end();
        this.errorLogStream.end();
        this.createStreamsAfterStart();
      }
    }
  }

  warn(message: string, context = '') {
    if (this.logLevelCheck(LogLevel.WARN)) {
      try {
        this.writeAppLogsToFile(
          `[${LogLevel.WARN.toUpperCase()}]:[${context}] ${message}`,
        );
        this.consoleLogger.warn(
          `[${LogLevel.WARN.toUpperCase()}]:[${context}] ${message}`,
        );
      } catch {
        this.appLogStream.end();
        this.errorLogStream.end();
        this.createStreamsAfterStart();
      }
    }
  }

  debug?(message: string, context = '') {
    if (this.logLevelCheck(LogLevel.DEBUG)) {
      try {
        this.writeAppLogsToFile(
          `[${LogLevel.DEBUG.toUpperCase()}]:[${context}] ${message}`,
        );
        this.consoleLogger.debug(
          `[${LogLevel.DEBUG.toUpperCase()}]:[${context}] ${message}`,
        );
      } catch {
        this.appLogStream.end();
        this.errorLogStream.end();
        this.createStreamsAfterStart();
      }
    }
  }

  verbose?(message: string, context = '') {
    if (this.logLevelCheck(LogLevel.VERBOSE)) {
      try {
        this.writeAppLogsToFile(
          `[${LogLevel.VERBOSE.toUpperCase()}]:[${context}] ${message}`,
        );
        this.consoleLogger.verbose(
          `[${LogLevel.VERBOSE.toUpperCase()}]:[${context}] ${message}`,
        );
      } catch {
        this.appLogStream.end();
        this.errorLogStream.end();
        this.createStreamsAfterStart();
      }
    }
  }

  fatal?(message: string, context = '') {
    if (this.logLevelCheck(LogLevel.FATAL)) {
      try {
        this.writeErrorLogsToFile(
          `[${LogLevel.FATAL.toUpperCase()}]:[${context}] ${message}`,
        );
        this.consoleLogger.fatal(
          `[${LogLevel.FATAL.toUpperCase()}]:[${context}] ${message}`,
        );
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

    if (size / 1024 > +this.MAX_SIZE) {
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

    if (size / 1024 > +this.MAX_SIZE) {
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
    return +lvlNumber <= +this.logLevel;
  }
}
