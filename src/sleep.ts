import { Duration } from './time';

export function sleep(duration: Duration) {
  return new Promise((res) => setTimeout(res, duration));
}
