export default class WinnerRequest {
  readonly id: number;

  readonly wins: number;

  readonly time: number;

  constructor(id: number, wins: number, time: number) {
    this.id = id;
    this.wins = wins;
    this.time = time;
  }
}
