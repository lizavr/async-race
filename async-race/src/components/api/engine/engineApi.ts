import Constants from '../../constants';
import BaseApi from '../baseApi';
import ICarCharacteristics from './ICarCharacteristics';

export default class EngineApi extends BaseApi {
  async start(id: number): Promise<ICarCharacteristics> {
    const res = await this.engine(id, 'started');
    const result: ICarCharacteristics = await res.json();
    return result;
  }

  async stop(id: number): Promise<ICarCharacteristics> {
    const res = await this.engine(id, 'stopped');
    const result: ICarCharacteristics = await res.json();
    return result;
  }

  async drive(id: number): Promise<boolean> {
    const response = await this.engine(id, 'drive');
    switch (response.status) {
      case 200:
        return true;
      case 500:
        throw new Error(Constants.engineBrokenErrorMessage);
      default:
        return false;
    }
  }

  async engine(id: number, action: string): Promise<Response> {
    const queryParams = [
      { key: 'id', value: id.toString() },
      { key: 'status', value: action },
    ];
    const response = await fetch(`${Constants.apiEngine}${this.generateQueryParam(queryParams)}`, {
      method: 'PATCH',
    });
    return response;
  }
}
