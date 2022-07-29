'use strict';
///////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
  
    // Never to this!
    // this.calcAge = function () {
    //   console.log(2037 - this.birthYear);
    // };
  };
  
  const jonas = new Person('Jonas', 1991);
  console.log(jonas);
  
  // 1. New {} is created
  // 2. function is called, this = {}
  // 3. {} linked to prototype
  // 4. function automatically return {}
  
  const matilda = new Person('Matilda', 2017);
  const jack = new Person('Jack', 1975);
  
  console.log(jonas instanceof Person);
  
  Person.hey = function () {
    console.log('Hey there 👋');
    console.log(this);
  };
  Person.hey();
  
  ///////////////////////////////////////
  // Prototypes
  console.log(Person.prototype);
  
  Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
  
  jonas.calcAge();
  matilda.calcAge();
  
  console.log(jonas.__proto__);
  console.log(jonas.__proto__ === Person.prototype);
  
  console.log(Person.prototype.isPrototypeOf(jonas));
  console.log(Person.prototype.isPrototypeOf(matilda));
  console.log(Person.prototype.isPrototypeOf(Person));
  
  // .prototyeOfLinkedObjects
  
  Person.prototype.species = 'Homo Sapiens';
  console.log(jonas.species, matilda.species);
  
  console.log(jonas.hasOwnProperty('firstName'));
  console.log(jonas.hasOwnProperty('species'));
  ///////////////////////////////////////////////
  // Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
///////////////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();


///////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  // BUG in video:
  // console.log(`My name is ${this.fullName} and I study ${this.course}`);
  
  // FIX:
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();


///////////////////////////////////////
