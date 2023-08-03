interface Engine {
    start(): void;
}

class GasEngine implements Engine {
    start() {
        console.log('Start the engine using gasoline');
    }
}

class ElectricEngine implements Engine {
    start(): void {
        console.log('Start the engine using electricity');
    }

}

class WaterEngine implements Engine {
    start(): void {
        console.log('Start the engine using water');
    }

}

class DependencyInjectionContainer {
    private dependencies: Map<string, Function> = new Map();

    constructor() {
        this.dependencies.set('gas', () => new GasEngine());
        this.dependencies.set('electric', () => new ElectricEngine());
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
const bmw: Car = new Car(container.createDependency('gas'));
bmw.startEngine();