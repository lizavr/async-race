import Constants from '../../constants';
import BaseApi from '../baseApi';
import IWinner from './IWinner';
import WinnerRequest from './winnerRequest';
import WinnersResponse from './winnersResponse';

export default class WinnersApi extends BaseApi {
  async getWinnersData(pageNumber: number, limit: number, sort: string, order: string): Promise<WinnersResponse> {
    const queryParams = [
      { key: '_page', value: pageNumber.toString() },
      { key: '_limit', value: limit.toString() },
      { key: '_sort', value: sort.toString() },
      { key: '_order', value: order.toString() },
    ];
    const response = await fetch(`${Constants.apiWinners}${this.generateQueryParam(queryParams)}`);
    const result: IWinner[] = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return new WinnersResponse(result, count);
  }

  async getWinner(id: number): Promise<IWinner | null> {
    const response = await fetch(`${Constants.apiWinners}/${id}`);
    if (response.status === 404) {
      return null;
    }
    const result: IWinner = await response.json();
    return result;
  }

  async createWinner(data: WinnerRequest): Promise<boolean> {
    const response = await fetch(`${Constants.apiWinners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  }

  async removeWinner(id: number): Promise<boolean> {
    const response = await fetch(`${Constants.apiWinners}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }

  async updateWinner(data: WinnerRequest, id: number): Promise<boolean> {
    const response = await fetch(`${Constants.apiWinners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  }
}
