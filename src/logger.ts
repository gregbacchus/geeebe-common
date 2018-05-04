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

export const logger = (function logger(writer: ILogWriter, meta?: {}): ILogger {
  const baseMeta = Object.assign({}, meta);
  const clz: any = (message: string, meta?: {}): void => {
    // const stack = new Error().stack;
    // const frame = stack && stack[1];
    const log = { message, timestamp: new Date() };
    Object.assign(log, systemMeta, baseMeta, meta);
    writer.write(log);
  };
  clz.error = (error: Error, meta?: {}): void => {
    const log = { message: `${error.name}: ${error.message}`, stack: error.stack, timestamp: new Date() };
    Object.assign(log, error, systemMeta, baseMeta, meta);
    writer.write(log);
  };
  clz.child = (meta: {}): ILogger => {
    const combinedMeta = Object.assign({}, baseMeta, meta);
    return logger(writer, combinedMeta);
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

const log: ILogger = logger(new ConsoleWriter());
// const log: ILogger = logger({ write: (log: {}) => { console.log(JSON.stringify(log)); } });

log('test');
log.error(new Error('foo bar'));

const child = log.child({ module: 'test' }).child({ module: 'asdf' });
child('child test', { a: 12, b: 3 });
