export declare type Duration = number;

export namespace Time {
  export const SECOND = 1000;
  export const MINUTE = 60 * Time.SECOND;
  export const HOUR = 60 * Time.MINUTE;
  export const DAY = 24 * Time.HOUR;

  export const ms = (ms: number): Duration => ms;
  export const seconds = (s: number): Duration => s * Time.SECOND;
  export const minutes = (m: number): Duration => m * Time.MINUTE;
  export const hours = (h: number): Duration => h * Time.HOUR;
  export const days = (d: number): Duration => d * Time.DAY;

  export const toMs = (d: Duration): number => d;
  export const toSeconds = (d: Duration): number => Math.round(d / Time.SECOND);
  export const toMinutes = (d: Duration): number => Math.round(d / Time.MINUTE);
  export const toHours = (d: Duration): number => Math.round(d / Time.HOUR);
  export const toDays = (d: Duration): number => Math.round(d / Time.DAY);
}
