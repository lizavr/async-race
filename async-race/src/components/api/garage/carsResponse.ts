import Car from './car';

export default class CarsResponse {
  response: Car[];

  count: number;

  constructor(response: Car[], count: number) {
    this.response = response;
    this.count = count;
  }
}
