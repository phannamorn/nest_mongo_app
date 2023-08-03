//Decorator
function logger(target: any) {
    console.log(`Creating an instance of ${target.name}`);
}

function logMethod(target: any, key: string, descriptor: PropertyDecorator) {
    console.log(`Calling ${key} method`);
}

function logProperty(target: any, key: string) {
    console.log(`Accessing ${key} property`);
}
//End decorator

//Generic
function identity<T>(arg: T): T {
    return arg;
}

interface Engine {
    wheel: number;

    start(): void;
}

@logger
class GasEngine implements Engine {
    constructor() {

    }

    @logProperty
    wheel: number;

    start() {
        console.log('Start the engine using gasoline.', identity<number>(12345));
    }
}

class ElectricEngine implements Engine {
    wheel: number;
    
    start(): void {
        console.log('Start the engine using electricity.');
    }

}

class WaterEngine implements Engine {
    wheel: number;

    start(): void {
        console.log('Start the engine using water');
    }

}

class DependencyInjectionContainer {
    private dependencies: Map<string, Function> = new Map();

    constructor() {
        this.dependencies.set(GasEngine.name, () => new GasEngine());
        this.dependencies.set(ElectricEngine.name, () => new ElectricEngine());
    }

    createDependency(type: string) {
        return this.dependencies.get(type)();
    }

    createEngine(type: string) {
      if (type === 'gas') {
        return new GasEngine();
      } else if (type === 'electric') {
        return new ElectricEngine();
      } else if (type == 'water') {
        return new WaterEngine();
      } else {
        throw new Error('Unknown engine type');
      }
    }
  }

class Car {
    private engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    startEngine() {
        this.engine.start();
    }
}

const container = new DependencyInjectionContainer();
const bmw: Car = new Car(container.createDependency(GasEngine.name));
bmw.startEngine();