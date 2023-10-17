import CarRequest from '../api/garage/carRequest';
import Constants from '../constants';

export default class CarsGenerator {
  static readonly carBrands: string[] = [
    'Skoda',
    'Toyota',
    'BMW',
    'Mercedes-Benz',
    'Ford',
    'Honda',
    'Volkswagen',
    'Audi',
    'Porsche',
    'Chevrolet',
    'Hyundai',
    'Kia',
    'Subaru',
    'Jeep',
    'Tesla',
    'Mazda',
  ];

  static readonly carModels: string[] = [
    'Kodiaq',
    'Camry',
    '3 Series',
    'E-Class',
    'Mustang',
    'Civic',
    'Golf',
    'A4',
    'Panamera',
    'Silverado',
    'Sonata',
    'Optima',
    'Outback',
    'Wrangler',
    'Model S',
    'CX-5',
  ];

  static generateCars(): CarRequest[] {
    const cars: CarRequest[] = [];
    for (let i = 0; i < Constants.carsAmountGenerate; i += 1) {
      const carName = this.generateName();
      const color = this.generateColor();
      const car = new CarRequest(carName, color);
      cars.push(car);
    }
    return cars;
  }

  static random(max: number): number {
    return Math.floor(Math.random() * max);
  }

  static generateName(): string {
    const brand = this.carBrands[this.random(this.carBrands.length)];
    const model = this.carModels[this.random(this.carModels.length)];
    return `${brand} ${model}`;
  }

  static generateColor(): string {
    const red = this.random(255);
    const green = this.random(255);
    const blue = this.random(255);
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  }
}
