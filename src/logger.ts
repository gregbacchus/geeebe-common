import * as stackTrace from 'stack-trace';
import os = require('os');

export interface ILogger {
  (message: string, meta?: {}): void;
  error(error: Error, meta?: {}): void;
  child(meta: {}): ILogger;
}

export interface ILogWriter {
  write(log: {}): void;
}

const systemMeta = {
  hostname: os.hostname(),
  pid: process.pid,
};

export const createLogger = (function createLogger(writer: () => ILogWriter, meta?: {}): ILogger {
  const baseMeta = Object.assign({}, meta);
  const clz: any = (message: string, meta?: {}): void => {
    const log: any = { message, timestamp: new Date() };
    try {
      // extend data
      const frame = stackTrace.get()[1];
      log.file = frame.getFileName();
      log.line = Number(frame.getLineNumber());

      const type = frame.getTypeName();
      const method = frame.getMethodName();
      Object.assign(log, {
        _method: method
          ? `${type}.${method}`
          : frame.getFunctionName(),
      });
    } catch (err) {
      console.error(err);
    }
    Object.assign(log, systemMeta, baseMeta, meta);
    writer().write(log);
  };
  clz.error = (error: Error, meta?: {}): void => {
    const log = { message: `${error.name}: ${error.message}`, stack: error.stack, timestamp: new Date() };
    Object.assign(log, error, systemMeta, baseMeta, meta);
    writer().write(log);
  };
  clz.child = (meta: {}): ILogger => {
    const combinedMeta = Object.assign({}, baseMeta, meta);
    return createLogger(writer, combinedMeta);
  };
  return clz;
});

export class Writer implements ILogWriter {
  constructor(private readonly writer: (log: {}) => void) { }

  public write(log: any): void {
    this.writer(log);
  }
}

function omit(obj: { [key: string]: any }, props: string[], fn?: (val: any, key: string, obj: {}) => boolean) {
  if (typeof props === 'function') {
    fn = props;
    props = [];
  }

  if (typeof props === 'string') {
    props = [props];
  }

  const isFunction = typeof fn === 'function';
  const keys = Object.keys(obj);
  const res: any = {};

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val: any = obj[key];

    if (!props || (props.indexOf(key) === -1 && (!isFunction || !fn || fn(val, key, obj)))) {
      res[key] = val;
    }
  }
  return res;
}

export class ConsoleWriter implements ILogWriter {
  public write(log: any): void {
    console.log(log.timestamp.toISOString(), log.message, omit(log, ['timestamp', 'message']));
  }
}

export const loggerOptions: { writer?: ILogWriter } = {};
const consoleWriter = new ConsoleWriter();
export const logger: ILogger = createLogger(() => loggerOptions.writer || consoleWriter);

// logger('test');
// logger.error(new Error('foo bar'));

// const child = logger.child({ module: 'test' }).child({ module: 'asdf' });
// child('child test', { a: 12, b: 3 });
