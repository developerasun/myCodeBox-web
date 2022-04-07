# Learning Nest js essentials

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

## Module

Create a Nest js module with CLI. 

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