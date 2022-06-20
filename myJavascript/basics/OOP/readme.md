# Understanding object-oriented programming

## Object

> A thing from real world.
> A thing that you want to store and process data about. Pretty much everything from real world.
> Sometimes called entity

## Abstraction

> Simplifying reality
> Ignoring irrelevant data, extracting only interested data/operation from object.

## Class

> A template for creating objects.
> Code written by programmers, adding attributes(properties) and operations(methods) to object.
> Creating object by class is called instantiation.

## Encapsulation

> Hiding data and complexity
> Often called information hiding
> It's not necessary to understand the inner workings of the class. Programmers only need to know the interface of the class(don't have to know about how it is implemented)

## Inheritance

> A class can derive its methods and properties from another class
> A hierarchy of classes

Below figure, Employee and customer is a type of Person. Programmer and cleaner is a type of Employee.

![inheritance](https://user-images.githubusercontent.com/83855174/174623957-1de08afe-dda7-49ca-9263-e473034e3ebc.png)

Base class are the top-most parent class. Any other than base class is subclasses.

## Polymorphism

> A class can implement an inherited method in its own way
> Subclasses can override methods from base class.
