# Learning Nest js essentials

- moudule, provider(service), consumer(controller)

> A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

> Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

> Under the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify as well!

> Nest provides a level of abstraction above these common Node.js frameworks (Express/Fastify), but also exposes their APIs directly to the developer. This gives developers the freedom to use the myriad of third-party modules which are available for the underlying platform.

## Philosophy

> In recent years, thanks to Node.js, JavaScript has become the “lingua franca” of the web for both front and backend applications. This has given rise to awesome projects like Angular, React and Vue, which improve developer productivity and enable the creation of fast, testable, and extensible frontend applications. However, while plenty of superb libraries, helpers, and tools exist for Node (and server-side JavaScript), none of them effectively solve the main problem of - Architecture.

> Nest provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular.

## Installation

> To get started, you can either scaffold the project with the Nest CLI, or clone a starter project (both will produce the same outcome).

> To scaffold the project with the Nest CLI, run the following commands. This will create a new project directory, and populate the directory with the initial core Nest files and supporting modules, creating a conventional base structure for your project. Creating a new project with the Nest CLI is recommended for first-time users. We'll continue with this approach in First Steps.

```shell
$npm i -g @nestjs/cli
$nest new project-name
```

## First step

> In this set of articles, you'll learn the core fundamentals of Nest. To get familiar with the essential building blocks of Nest applications, we'll build a basic CRUD application with features that cover a lot of ground at an introductory level.

### Language

> We're in love with TypeScript, but above all - we love Node.js. That's why Nest is compatible with both TypeScript and pure JavaScript. Nest takes advantage of the latest language features, so to use it with vanilla JavaScript we need a Babel compiler.

> We'll mostly use TypeScript in the examples we provide, but you can always switch the code snippets to vanilla JavaScript syntax (simply click to toggle the language button in the upper right hand corner of each snippet).

### Setup

> Setting up a new project is quite simple with the Nest CLI. With npm installed, you can create a new Nest project with the following commands in your OS terminal:

```shell
$npm i -g @nestjs/cli
$nest new project-name
```

> The project-name directory will be created, node modules and a few other boilerplate files will be installed, and a src/ directory will be created and populated with several core files.

```
src
    app.controller.spec.ts: The unit tests for the controller.

    app.controller.ts: A basic controller with a single route.

    app.module.ts: The root module of the application.

    app.service.ts: A basic service with a single method.

    main.ts: The entry file of the application which uses the core function NestFactory to create a Nest application instance.

```

> The main.ts includes an async function, which will bootstrap our application:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

> To create a Nest application instance, we use the core NestFactory class. NestFactory exposes a few static methods that allow creating an application instance. The create() method returns an application object, which fulfills the INestApplication interface. This object provides a set of methods which are described in the coming chapters. In the main.ts example above, we simply start up our HTTP listener, which lets the application await inbound HTTP requests.

## Controllers

> Controllers are responsible for handling incoming requests and returning responses to the client.

> A controller's purpose is to receive specific requests for the application. The routing mechanism controls which controller receives which requests. Frequently, each controller has more than one route, and different routes can perform different actions.

> In order to create a basic controller, we use classes and decorators. Decorators associate classes with required metadata and enable Nest to create a routing map (tie requests to the corresponding controllers).

### Routing

> In the following example we'll use the @Controller() decorator, which is required to define a basic controller. We'll specify an optional route path prefix of cats. Using a path prefix in a @Controller() decorator allows us to easily group a set of related routes, and minimize repetitive code. For example, we may choose to group a set of routes that manage interactions with a customer entity under the route /customers. In that case, we could specify the path prefix customers in the @Controller() decorator so that we don't have to repeat that portion of the path for each route in the file.

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats') // grouping methods
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

### Request object

> Handlers often need access to the client request details. Nest provides access to the request object of the underlying platform (Express by default). We can access the request object by instructing Nest to inject it by adding the @Req() decorator to the handler's signature.

```ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

> The request object represents the HTTP request and has properties for the request query string, parameters, HTTP headers, and body (read more here). In most cases, it's not necessary to grab these properties manually. We can use dedicated decorators instead, such as @Body() or @Query(), which are available out of the box. Below is a list of the provided decorators and the plain platform-specific objects they represent.

1. req => @Request(), @Req()
1. res => @Response(), @Res()*
1. next => @Next()
1. req.session => @Session()
1. req.params / req.params[key] => @Param(key?: string)
1. req.query / req.query[key] => @Query(key?: string)
1. req.headers / req.headers[name] / req.query[key] => @Headers(name?: string)
1. req.ip / req.query[key] => @Ip()
1. req.hosts / req.query[key] => @HostParam()

> *For compatibility with typings across underlying HTTP platforms (e.g., Express and Fastify), Nest provides @Res() and @Response() decorators. @Res() is simply an alias for @Response(). Both directly expose the underlying native platform response object interface. When using them, you should also import the typings for the underlying library (e.g., @types/express) to take full advantage. **Note that when you inject either @Res() or @Response() in a method handler, you put Nest into Library-specific mode for that handler**, and you become responsible for managing the response. When doing so, you must issue some kind of response by making a call on the response object (e.g., res.json(...) or res.send(...)), or the HTTP server will hang.


### Resources

> Earlier, we defined an endpoint to fetch the cats resource (GET route). We'll typically also want to provide an endpoint that creates new records. For this, let's create the POST handler:

```ts
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

> It's that simple. Nest provides decorators for all of the standard HTTP methods: @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), and @Head(). In addition, @All() defines an endpoint that handles all of them

### Status code

> As mentioned, the response status code is always 200 by default, except for POST requests which are 201. We can easily change this behavior by adding the @HttpCode(...) decorator at a handler level.

```ts 
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

> Often, your status code isn't static but depends on various factors. In that case, you can use a library-specific response (inject using @Res()) object (or, in case of an error, throw an exception).

### Headers

> To specify a custom response header, you can either use a @Header() decorator or a library-specific response object (and call res.header() directly).

```ts
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

### Redirection

> To redirect a response to a specific URL, you can either use a @Redirect() decorator or a library-specific response object (and call res.redirect() directly). @Redirect() takes two arguments, url and statusCode, both are optional. The default value of statusCode is 302 (Found) if omitted.

```ts
@Get()
@Redirect('https://nestjs.com', 301)
```

### Getting up and running

> Controllers always belong to a module, which is why we include the controllers array within the @Module() decorator. Since we haven't yet defined any other modules except the root AppModule, we'll use that to introduce the CatsController

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

## Providers

> Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be injected as a dependency; this means objects can create various relationships with each other, and the function of "wiring up" instances of objects can largely be delegated to the Nest runtime system.

> In the previous chapter, we built a simple CatsController. Controllers should handle HTTP requests and delegate more complex tasks to providers. **Providers are plain JavaScript classes that are declared as providers in a module**.

### Services

> Let's start by creating a simple CatsService. This service will be responsible for data storage and retrieval, and is designed to be used by the CatsController, so it's a good candidate to be defined as a provider.

```ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

> Our CatsService is a basic class with one property and two methods. The only new feature is that it uses the @Injectable() decorator. The @Injectable() decorator attaches metadata, which declares that CatsService is a class that can be managed by the Nest IoC container. By the way, this example also uses a Cat interface, which probably looks something like this:

```ts
export interface Cat {
  name: string;
  age: number;
  breed: string;
}
```

> Now that we have a service class to retrieve cats, let's use it inside the CatsController:

```ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

> The CatsService is injected through the class constructor. Notice the use of the private syntax. This shorthand allows us to both declare and initialize the catsService member immediately in the same location.

### Dependency injection

> Nest is built around the strong design pattern commonly known as Dependency injection. We recommend reading a great article about this concept in the official Angular documentation.

> In Nest, thanks to TypeScript capabilities, it's extremely easy to manage dependencies because they are resolved just by type. In the example below, Nest will resolve the catsService by creating and returning an instance of CatsService (or, in the normal case of a singleton, returning the existing instance if it has already been requested elsewhere). **This dependency is resolved and passed to your controller's constructor** (or assigned to the indicated property):

```ts
constructor(private catsService: CatsService) {}
```

### Scopes

> Providers normally have a lifetime ("scope") synchronized with the application lifecycle. When the application is bootstrapped, every dependency must be resolved, and therefore every provider has to be instantiated. Similarly, when the application shuts down, each provider will be destroyed. However, there are ways to make your provider lifetime request-scoped as well.

### Custom providers

> Nest has a built-in inversion of control ("IoC") container that resolves relationships between providers. This feature underlies the dependency injection feature described above, but is in fact far more powerful than what we've described so far. There are several ways to define a provider: you can use plain values, classes, and either asynchronous or synchronous factories. More examples are provided here.

### Provider registration

> Now that we have defined a provider (CatsService), and we have a consumer of that service (CatsController), we need to register the service with Nest so that it can perform the injection. We do this by editing our module file (app.module.ts) and adding the service to the providers array of the @Module() decorator.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

## Module

> A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.
Create a Nest js module with CLI. 

<img src="nest-module-application.png" width=564 height=410 alt="nest application module" />

> Each application has at least one module, a root module. The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies. While very small applications may theoretically have just the root module, this is not the typical case. We want to emphasize that modules are strongly recommended as an effective way to organize your components. Thus, for most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

> The @Module() decorator takes a single object whose properties describe the module:

```ts
@Module({
  imports: [CustomerModule, UserModule],
  controllers: [],
  providers: [],
})
```

> The module encapsulates providers by default. This means that it's impossible to inject providers that are neither directly part of the current module nor exported from the imported modules. Thus, you may consider the exported providers from a module as the module's public interface, or API.

### Feature modules

> The CatsController and CatsService belong to the same application domain. As they are closely related, it makes sense to move them into a feature module. A feature module simply organizes code relevant for a specific feature, keeping code organized and establishing clear boundaries. This helps us manage complexity and develop with SOLID principles, especially as the size of the application and/or team grow.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

> Above, we defined the CatsModule in the cats.module.ts file, and **moved everything related to this module into the cats directory**. The last thing we need to do is import this module into the root module (the AppModule, defined in the app.module.ts file).

```ts
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

### Shared modules

> In Nest, **modules are singletons by default**, and thus you can share the same instance of any provider between multiple modules effortlessly.

<details>
<summary>What is singleton? </summary>

> In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a class to one "single" instance. This is useful when exactly one object is needed to coordinate actions across the system.
</details>

> Every module is automatically a shared module. Once created it can be reused by any module. Let's imagine that we want to share an instance of the CatsService between several other modules. In order to do that, we first need to export the CatsService provider by adding it to the module's exports array, as shown below:

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // export CatsService(making the instance accessible from outside)
  exports: [CatsService]
})
export class CatsModule {}
```

> Now any module that imports the CatsModule has access to the CatsService and will share the same instance with all other modules that import it as well.

### Module re-exporting

> As seen above, Modules can export their internal providers. In addition, they can re-export modules that they import. In the example below, the CommonModule is both imported into and exported from the CoreModule, making it available for other modules which import this one.

```ts
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

### Global modules

> If you have to import the same set of modules everywhere, it can get tedious. Unlike in Nest, Angularproviders are registered in the global scope. Once defined, they're available everywhere. **Nest, however, encapsulates providers inside the module scope**. You aren't able to use a module's providers elsewhere without first importing the encapsulating module.

When you want to provide a set of providers which should be available everywhere out-of-the-box (e.g., helpers, database connections, etc.), **make the module global with the @Global() decorator**.

```ts
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// make module globally accessible
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

> The @Global() decorator makes the module global-scoped. Global modules should be registered only once, generally by the root or core module. In the above example, the CatsService provider will be ubiquitous, and modules that wish to inject the service will not need to import the CatsModule in their imports array.

> Note that Making everything global is not a good design decision. Global modules are available to reduce the amount of necessary boilerplate. The imports array is generally the preferred way to make the module's API available to consumers.

### Dynamic modules

> The Nest module system includes a powerful feature called dynamic modules. This feature enables you to easily create customizable modules that can register and configure providers dynamically. Dynamic modules are covered extensively here. In this chapter, we'll give a brief overview to complete the introduction to modules. Following is an example of a dynamic module definition for a DatabaseModule:

```ts
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      global: true, // If you want to register a dynamic module in the global scope, set the global property to true.
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

> This module defines the Connection provider by default (in the @Module() decorator metadata), but additionally - depending on the entities and options objects passed into the forRoot() method - exposes a collection of providers, for example, repositories. Note that the properties returned by the dynamic module extend (rather than override) the base module metadata defined in the @Module() decorator. That's how both the statically declared Connection provider and the dynamically generated repository providers are exported from the module.

> The DatabaseModule can be imported and configured in the following manner:

```ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

> If you want to in turn re-export a dynamic module, you can omit the forRoot() method call in the exports array:

```ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}
```

## Middlewares

> Middleware is a function which is called before the route handler. Middleware functions have access to the request and response objects, and the next() middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

<img src="client-middeware-handler.png" width=970 height=220 alt="middleware in HTTP" />

> Nest middleware are, by default, equivalent to express middleware. The following description from the official express documentation describes the capabilities of middleware:

1. execute any code.
1. make changes to the request and the response objects.
1. end the request-response cycle.
1. call the next middleware function in the stack.
1. **if the current middleware function does not end the request-response cycle, it must call next()** to pass control to the next middleware function. Otherwise, the request will be left hanging.

> You implement custom Nest middleware in either a function, or in a class with an @Injectable() decorator. The class should implement the NestMiddleware interface, while the function does not have any special requirements. Let's start by implementing a simple middleware feature using the class method.

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

### Dependency injection

> Nest middleware fully supports Dependency Injection. Just as with providers and controllers, they are able to inject dependencies that are available within the same module. As usual, this is **done through the constructor**.

### Applying middleware

> There is no place for middleware in the @Module() decorator. Instead, we set them up using the configure() method of the module class. Modules that include middleware have to implement the NestModule interface. Let's set up the LoggerMiddleware at the AppModule level.

```ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

> In the above example we have set up the LoggerMiddleware for the /cats route handlers that were previously defined inside the CatsController. We may also further restrict a middleware to a particular request method by passing an object containing the route path and request method to the forRoutes() method when configuring the middleware. In the example below, notice that we import the RequestMethod enum to reference the desired request method type.

```ts
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
```

### Functional middleware

> The LoggerMiddleware class we've been using is quite simple. It has no members, no additional methods, and no dependencies. Why can't we just define it in a simple function instead of a class? In fact, we can. This type of middleware is called functional middleware. Let's transform the logger middleware from class-based into functional middleware to illustrate the difference:

```ts
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
```

> And use it within the AppModule:

```ts
consumer
  .apply(logger)
  .forRoutes(CatsController);
```

> Consider using the simpler functional middleware alternative any time your middleware doesn't need any dependencies.

## Interceptors

> An interceptor is a class annotated with the @Injectable() decorator, which implements the NestInterceptor interface.

> Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:

1. bind extra logic before / after method execution
1. transform the result returned from a function
1. transform the exception thrown from a function
1. extend the basic function behavior
1. completely override a function depending on specific conditions (e.g., for caching purposes)

## Nest CLI

```shell
$nest generate module (module-name)

# you can use alias for short. 
$nest g module (module-name)

# generate controller
$nest g co customer

# generate service
$nest g service customer
```

<img src="reference/nest-js-cli.png" width=708 height=401 alt="nest js cli" />


## Reference
- [Nest.js Docs](https://nestjs.com/)
- [Wikipedia: Singleton pattern](https://en.wikipedia.org/wiki/Singleton_pattern)