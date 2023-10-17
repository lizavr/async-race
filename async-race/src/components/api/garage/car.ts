import ICarCharacteristics from '../engine/ICarCharacteristics';
import ICar from './ICar';

export default class Car implements ICar {
  private _name: string;

  private _color: string;
  
  private _id: number;

  private _isDriving: boolean;

  private _isStopped: boolean;

  private _isBroken: boolean;

  private _timeAnimation: number;

  private _finishTime: number;

  constructor(car: ICar) {
    this._name = car.name;
    this._color = car.color;
    this._id = car.id;
    this._isDriving = false;
    this._isStopped = true;
    this._isBroken = false;
    this._timeAnimation = 0;
    this._finishTime = 0;
  }

  get isDriving(): boolean {
    return this._isDriving;
  }

  set isDriving(value) {
    this._isDriving = value;
  }

  get isStopped(): boolean {
    return this._isStopped;
  }

  set isStopped(value) {
    this._isStopped = value;
  }

  get isBroken(): boolean {
    return this._isBroken;
  }

  set isBroken(value) {
    this._isBroken = value;
  }

  get id(): number {
    return this._id;
  }

  get color(): string {
    return this._color;
  }

  get name(): string {
    return this._name;
  }

  get timeAnimation() {
    return this._timeAnimation;
  }

  get finishTime(): number {
    return this._finishTime;
  }

  set finishTime(value: number) {
    this._finishTime = value;
  }

  countTimeAnimation(answer: ICarCharacteristics) {
    const res = answer.distance / answer.velocity;
    this._timeAnimation = res;
  }
}
