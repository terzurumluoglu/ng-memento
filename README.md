# NgMemento

it's unstable yet. Stable version will be released soon.

ng-memento helps your application to be faster by preventing the same http requests from being called again in your Angular project.

## Angular17

Unfortunately, it only supports Angular v17 yet.

## Installation

```bash
npm i ng-memento --save
```

## Demo

Coming Soon

## How can I use?

```typescript
import { NgMementoModule } from "ng-memento";

const config: IConfig = {
  expireTimeAsMilliSeconds: 60 * 60 * 1000,
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
  providers: [...importProvidersFrom(NgMementoModule.forRoot(config))],
};
```
