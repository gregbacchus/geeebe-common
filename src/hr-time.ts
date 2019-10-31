/**
 * [seconds, nanoseconds]
 */
export declare type HrDuration = [number, number];

export namespace HrTime {
  export const MS = 1e6;
  export const SECOND = 1e9;
  export const MINUTE = 60 * HrTime.SECOND;
  export const HOUR = 60 * HrTime.MINUTE;
  export const DAY = 24 * HrTime.HOUR;

  export const past = (interval: HrDuration) => new Date(Date.now() - toMs(interval));
  export const future = (interval: HrDuration) => new Date(Date.now() + toMs(interval));

  export const ns = (ns: number): HrDuration => [Math.round(ns / HrTime.SECOND), Math.round(ns % HrTime.SECOND)];
  export const ms = (ms: number): HrDuration => ns(ms * HrTime.MS);
  export const seconds = (s: number): HrDuration => ns(s * HrTime.SECOND);
  export const minutes = (m: number): HrDuration => ns(m * HrTime.MINUTE);
  export const hours = (h: number): HrDuration => ns(h * HrTime.HOUR);
  export const days = (d: number): HrDuration => ns(d * HrTime.DAY);

  export const wholeMs = (d: HrDuration): number => Math.round(toNs(d) / HrTime.MS);
  export const wholeSeconds = (d: HrDuration): number => Math.round(toNs(d) / HrTime.SECOND);
  export const wholeMinutes = (d: HrDuration): number => Math.round(toNs(d) / HrTime.MINUTE);
  export const wholeHours = (d: HrDuration): number => Math.round(toNs(d) / HrTime.HOUR);
  export const wholeDays = (d: HrDuration): number => Math.round(toNs(d) / HrTime.DAY);

  export const toNs = (d: HrDuration): number => d[0] * HrTime.SECOND + d[1];
  export const toMs = (d: HrDuration): number => toNs(d) / HrTime.MS;
  export const toSeconds = (d: HrDuration): number => toNs(d) / HrTime.SECOND;
  export const toMinutes = (d: HrDuration): number => toNs(d) / HrTime.MINUTE;
  export const toHours = (d: HrDuration): number => toNs(d) / HrTime.HOUR;
  export const toDays = (d: HrDuration): number => toNs(d) / HrTime.DAY;
}
