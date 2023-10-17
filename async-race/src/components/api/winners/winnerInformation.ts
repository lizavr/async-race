import IWinner from './IWinner';

export default class WinnerInformation implements IWinner {
  private _id: number;

  private _wins: number;

  private _time: number;

  private _name: string;

  private _color: string;

  constructor(winner: IWinner, name: string, color: string) {
    this._id = winner.id;
    this._wins = winner.wins;
    this._time = winner.time;
    this._name = name;
    this._color = color;
  }

  get id(): number {
    return this._id;
  }

  get wins(): number {
    return this._wins;
  }

  get time(): number {
    return this._time;
  }

  get name(): string {
    return this._name;
  }

  get color(): string {
    return this._color;
  }
}
