import { Time } from '.';

/**
 * [seconds, nanoseconds]
 */
export declare type HrDuration = [number, number];

export namespace HrTime {
  export const past = (interval: HrDuration) => new Date(Date.now() - toMs(interval));
  export const future = (interval: HrDuration) => new Date(Date.now() + toMs(interval));

  export const ms = (ms: number): HrDuration => [Math.round(ms / 1e3), Math.round(ms * 1e6 % 1e9)];
  export const seconds = (s: number): HrDuration => ms(s * Time.SECOND);
  export const minutes = (m: number): HrDuration => ms(m * Time.MINUTE);
  export const hours = (h: number): HrDuration => ms(h * Time.HOUR);
  export const days = (d: number): HrDuration => ms(d * Time.DAY);

  export const wholeMs = (d: HrDuration): number => Math.round(toMs(d));
  export const wholeSeconds = (d: HrDuration): number => Math.round(toMs(d) / Time.SECOND);
  export const wholeMinutes = (d: HrDuration): number => Math.round(toMs(d) / Time.MINUTE);
  export const wholeHours = (d: HrDuration): number => Math.round(toMs(d) / Time.HOUR);
  export const wholeDays = (d: HrDuration): number => Math.round(toMs(d) / Time.DAY);

  export const toMs = (d: HrDuration): number => d[0] / 1e3 + d[1] / 1e12;
  export const toSeconds = (d: HrDuration): number => toMs(d) / Time.SECOND;
  export const toMinutes = (d: HrDuration): number => toMs(d) / Time.MINUTE;
  export const toHours = (d: HrDuration): number => toMs(d) / Time.HOUR;
  export const toDays = (d: HrDuration): number => toMs(d) / Time.DAY;
}
