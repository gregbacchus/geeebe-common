# `@geeebe/common`

This library has tiny bit of useful code, plus a util for setting up a `typescript` project with some common useful settings including `ts-node`, `tslint` and `jest`.

## Getting Started

In empty project directory.

```bash
npm init
# fill in details asked (defaults will do)
npm i @geeebe/common
npx geeebe init
```

This will do the following for your project

* create `.editorconfig`, `.gitignore` and `.npmignore`
* install `typescript` and `ts-node`
* install and configure `tslint`
* install `jest` with `ts-jest` and create a starter config
* install and configure `nodemon`

To get started, write some `typescript` code in `src/index.ts` and run it.

To run, either use:

* `npm start` to run one-off using `ts-node`
* `npm run watch` to run and watch for changes using `nodemon` and `ts-node`
* `npm run build` to build output to `dist/` using `tsc`

Also useful:

* `npm test` to run `jest` tests in the `test/` directory (looking for `*.test.ts` files)
* `npm run lint` to run `tslint`

## Included Code

Not too much here...

HTTP response status

```typescript
import { Statuses } from '@geeebe/common';

// ...

if (status === Statuses.NOT_FOUND) {} // 404
```

Some simple functions for time and duration

```typescript
import { Time } from '@geeebe/common';

const fiveMinutes = Time.minutes(5); // 5 min in ms = 5 * 60 * 1000
const sevenHours = Time.hours(7); // 7 hours in ms
const someTime = Time.days(2) + Time.hours(3) + Time.seconds(2);

// and then
const hours = Time.toHours(sevenHours);
// etc

// also
const fourHoursAgo = Time.past(Time.hours(4)); // Date() of 4 hours ago
const future = Time.future(Time.seconds(45)); // or in the future
```

Methods:

* `ms(ms: number): Duration`
* `seconds(s: number): Duration`
* `minutes(m: number): Duration`
* `hours(h: number): Duration`
* `days(d: number): Duration`
* `toMs(d: Duration): number`
* `toSeconds(d: Duration): number`
* `toMinutes(d: Duration): number`
* `toHours(d: Duration): number`
* `toDays(d: Duration): number`
* `past(interval: Duration): Date`
* `future(interval: Duration): Date`

Constants:

* `SECOND = 1000`
* `MINUTE = 60 * Time.SECOND`
* `HOUR = 60 * Time.MINUTE`
* `DAY = 24 * Time.HOUR`

Async sleep function

```typescript
await sleep(Time.seconds(45));
```
