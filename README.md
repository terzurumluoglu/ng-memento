# NgMemento

it's unstable yet. Stable version will be released soon.

ng-memento makes your application to be faster by preventing the same http requests from being called again in your Angular project.

## Angular17

Unfortunately, it only supports Angular v17 yet.

## Installation

```bash
npm i ng-memento --save
```

## Demo

Coming Soon

## Stable Versions Each Other

| Angular version | ng-memento version |
| :-------------- | :----------------- |
| `v17.x.x`       | `v7.x.x`           |

## How can I use?

```typescript
import { NgMementoModule } from "ng-memento";

const config: IMementoConfig = {
  expireTimeAsMilliSeconds: 60 * 60 * 1000,
  store: 'local',
  storeKey: 'MEMENTO_KEY'
  paths: [
    {
      method: ["GET", "POST"],
      path: "users/*",
    },
    {
      method: ["GET"],
      path: "comments",
    },
  ],
};


export const appConfig: ApplicationConfig = {
  providers: [
    ...,
    importProvidersFrom(
      NgMementoModule.forRoot(config)
    ),
  ],
};
```

## IMementoConfig

| property                   | type                       | default       | required | description                                      |
| :------------------------- | :------------------------- | :------------ | :------- | :----------------------------------------------- |
| `expireTimeAsMilliSeconds` | `number`                   |               | ✓        | cached data stored time                          |
| `paths`                    | `IMethodPath`              |               | ✓        | paths and methods                                |
| `store`                    | `none`, `local`, `session` | `none`        | x        | none: cached data stored lives only next refresh |
| `storeKey`                 | `string`                   | `MEMENTO_KEY` | x        | key that stores data if chose local or session   |
