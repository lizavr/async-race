import Constants from '../../constants';
import BaseApi from '../baseApi';
import ICar from './ICar';
import Car from './car';
import CarRequest from './carRequest';
import CarsResponse from './carsResponse';

export default class GarageApi extends BaseApi {
  async getCarsData(pageNumber: number, limit: number): Promise<CarsResponse> {
    const queryParams = [
      { key: '_page', value: pageNumber.toString() },
      { key: '_limit', value: limit.toString() },
    ];
    const response = await fetch(`${Constants.apiGarage}${this.generateQueryParam(queryParams)}`);
    const result: ICar[] = await response.json();
    const cars = result.map((item) => new Car(item));
    const count = Number(response.headers.get('X-Total-Count'));
    const carsResponse = new CarsResponse(cars, count);
    return carsResponse;
  }

  async getCar(id: number): Promise<ICar> {
    const response = await fetch(`${Constants.apiGarage}/${id}`);
    const result: ICar = await response.json();
    return result;
  }

  async createNewCar(data: CarRequest): Promise<boolean> {
    const response = await fetch(`${Constants.apiGarage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  }

  async updateCar(data: CarRequest, id: number):Promise<boolean> {
    const response = await fetch(`${Constants.apiGarage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  }

  async removeCar(id: number):Promise<boolean> {
    const response = await fetch(`${Constants.apiGarage}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }
}
