import IWinner from './IWinner';

export default class WinnersResponse {
  response: IWinner[];

  count: number;

  constructor(response: IWinner[], count: number) {
    this.response = response;
    this.count = count;
  }
}
