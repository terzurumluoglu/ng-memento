# NgMemento

ng-memento makes your application faster by preventing the same http requests from being called again in your Angular project.

## Installation

```bash
npm i ng-memento --save
```

## Demo

### Example

The application was built by using this library. [Visit](https://ng-memento-web.onrender.com/users)

### Image

![til](https://ng-memento-web.onrender.com/assets/demo.gif)

## Stable Versions

| Angular version | ng-memento version |
| :-------------- | :----------------- |
| `v13.x.x`       | `v3.x.x`           |
| `v14.x.x`       | `v4.x.x`           |
| `v15.x.x`       | `v5.x.x`           |
| `v16.x.x`       | `v6.x.x`           |
| `v17.x.x`       | `v7.x.x`           |
| `v18.x.x`       | `v8.x.x`           |

## Documentation

### How can I use?

```typescript
import { NgMementoModule, IMementoConfig } from "ng-memento";

const config: IMementoConfig = {
  expireTimeAsMilliSeconds: 60 * 60 * 1000, // an hour
  store: 'local',
  storeKey: 'MEMENTO_KEY',
  paths: [
    {
      methods: ["GET"],
      path: "comments/*",
      store: "session",
    },
    {
      methods: ["GET", "POST"],
      path: "users/1",
      storeKey: "MEMENTO_USERS",
      expireTimeAsMilliSeconds: 24 * 60 * 60 * 1000, // a day

    },
    {
      methods: ["GET", "POST"],
      path: "users/2",
      storeKey: "MEMENTO_USERS",
      expireTimeAsMilliSeconds: 24 * 60 * 60 * 1000, // a day
    },
    {
      methods: ["GET"],
      path: "posts",
      store: "none",
    },
  ],
};

/* MODULE-BASED ARCHITECTURE */
@NgModule({
  declarations: [],
  imports: [
    ...,
    NgMementoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}

/* STANDALONE ARCHITECTURE */
export const appConfig: ApplicationConfig = {
  providers: [
    ...,
    importProvidersFrom(
      NgMementoModule.forRoot(config),
    ),
  ],
};
```

### Types

#### IMementoConfig

| property                   | type                       | default       | required | description                                            |
| :------------------------- | :------------------------- | :------------ | :------- | :----------------------------------------------------- |
| `expireTimeAsMilliSeconds` | `number`                   | 0             | x        | cached data stored time                                |
| `paths`                    | `IMethodPath`              |               | ✓        |                                                        |
| `store`                    | `none`, `local`, `session` | `none`        | x        | none: cached data stored lives only until next refresh |
| `storeKey`                 | `string`                   | `MEMENTO_KEY` | x        | key that stores data if chose local or session         |

#### IMethodPath

| property                   | type                       | default      | required | description                                                                  |
| :------------------------- | :------------------------- | :----------- | :------- | :--------------------------------------------------------------------------- |
| `methods`                  | `MethodType`               |              | ✓        | methods to be cached                                                         |
| `path`                     | `string`                   |              | ✓        | path to be cached **(if path ends with '/\*' all sub paths will be cached)** |
| `expireTimeAsMilliSeconds` | `number`                   | parent value | x        | cached data stored time                                                      |
| `store`                    | `none`, `local`, `session` | parent value | x        | none: cached data stored lives only until next refresh                       |
| `storeKey`                 | `string`                   | parent value | x        | key that stores data if chose local or session                               |

#### MethodType

| property     | type                            | default | required | description          |
| :----------- | :------------------------------ | :------ | :------- | :------------------- |
| `MethodType` | `"GET", "POST", "PUT", "PATCH"` |         | ✓        | methods to be cached |

### Important

**You should use MethodType carefully. You send same header, body, params and path when you use POST, PUT and PATCH method, ng-memento will prevent the request therefore the data will not affect.**
