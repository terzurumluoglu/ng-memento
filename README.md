# NgMemento

ng-memento makes your application to be faster by preventing the same http requests from being called again in your Angular project.

## Angular17

it's stable for Angular version 17 yet.

It will be supported v14+ soon.

## Installation

```bash
npm i ng-memento --save
```

## Demo

The application was built by using this library? [Visit](https://ng-memento-web.onrender.com/users)

![til](https://ng-memento-web.onrender.com/assets/demo.gif)

## Stable Versions

| Angular version | ng-memento version |
| :-------------- | :----------------- |
| `v14.x.x`       | `v4.x.x`           |
| `v15.x.x`       | `v5.x.x`           |
| `v16.x.x`       | `v6.x.x`           |
| `v17.x.x`       | `v7.x.x`           |
| `v18.x.x`       | `v8.x.x`           |

## How can I use?

```typescript
import { NgMementoModule, IMementoConfig } from "ng-memento";

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
      path: "posts",
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

## Documentation

#### IMementoConfig

| property                   | type                       | default       | required | description                                      |
| :------------------------- | :------------------------- | :------------ | :------- | :----------------------------------------------- |
| `expireTimeAsMilliSeconds` | `number`                   |               | ✓        | cached data stored time                          |
| `paths`                    | `IMethodPath`              |               | ✓        |
| `store`                    | `none`, `local`, `session` | `none`        | x        | none: cached data stored lives only next refresh |
| `storeKey`                 | `string`                   | `MEMENTO_KEY` | x        | key that stores data if chose local or session   |

#### IMethodPath

| property  | type         | default | required | description                                                                  |
| :-------- | :----------- | :------ | :------- | :--------------------------------------------------------------------------- |
| `methods` | `methodType` |         | ✓        | methods to be cached                                                         |
| `path`    | `string`     |         | ✓        | path to be cached **(if path ends with '/\*' all sub paths will be cached)** |

#### methodType

| property     | type                            | default | required | description          |
| :----------- | :------------------------------ | :------ | :------- | :------------------- |
| `methodType` | `"GET", "POST", "PUT", "PATCH"` |         | ✓        | methods to be cached |

## Important

**You should use methodType carefully. You send same header, body, params and path when you use POST, PUT and PATCH method, ng-memento will prevent the request therefore the data will not affect.**
