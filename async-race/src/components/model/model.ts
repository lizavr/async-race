import ICarCharacteristics from '../api/engine/ICarCharacteristics';
import Car from '../api/garage/car';
import WinnerInformation from '../api/winners/winnerInformation';
import Constants from '../constants';
import GeneralViews from '../view/generalView';

export default class Model {
  private _isGarage: boolean;

  private _view: GeneralViews;

  private _cars: Car[];

  private _countCars: number;

  private _currentCarsPage: number;

  private _currentWinnersPage: number;

  private _selectedCar: Car | null;

  private _startTime: number;

  private _winners: WinnerInformation[];

  private _countWinners: number;

  private _sortColumn: string;

  private _isSortDirectionASC: boolean;

  private _isRaceMode: boolean;

  constructor(view: GeneralViews) {
    this._view = view;
    this._isGarage = true;
    this._cars = [];
    this._countCars = 0;
    this._currentCarsPage = Constants.startPage;
    this._currentWinnersPage = Constants.startPage;
    this._selectedCar = null;
    this._startTime = 0;
    this._winners = [];
    this._countWinners = 0;
    this._sortColumn = Constants.timeSort;
    this._isSortDirectionASC = true;
    this._isRaceMode = false;
  }

  changePage(isGarage: boolean): void {
    this._isGarage = isGarage;
    this._view.changeVisiblePage(this);
  }

  updateCars(cars: Car[], countCars: number): void {
    this._cars = cars;
    this._countCars = countCars;
    this._view.drawCars(this);
  }

  selectCar(car: Car) {
    this._selectedCar = car;
    this._view.updateCar(this);
  }

  startCar(id: number, carCharacteristics: ICarCharacteristics) {
    const carStarted = this.cars.find((item) => item.id === id);
    if (!carStarted) {
      return;
    }
    carStarted.isDriving = true;
    carStarted.isStopped = false;
    carStarted.countTimeAnimation(carCharacteristics);
    this._view.animateCar(carStarted);
  }

  stopCar(id: number, carCharacteristics: ICarCharacteristics) {
    const carStopped = this.cars.find((item) => item.id === id);
    if (!carStopped) {
      return;
    }
    carStopped.isDriving = false;
    carStopped.isStopped = true;
    carStopped.isBroken = false;
    carStopped.finishTime = 0;
    carStopped.countTimeAnimation(carCharacteristics);
    this._view.returnCarToStart(carStopped);
  }

  setWinner(car: Car): void {
    const time = (car.finishTime - this.startTime) / 1000;
    this._view.showWinPopup(car.name, time);
  }

  updateWinners(winners: WinnerInformation[], countWinners: number): void {
    this._winners = winners;
    this._countWinners = countWinners;
    this._view.drawWinners(this);
  }

  get isGarage(): boolean {
    return this._isGarage;
  }

  get cars(): Car[] {
    return this._cars;
  }

  get countCars(): number {
    return this._countCars;
  }

  get selectedCar(): Car | null {
    return this._selectedCar;
  }

  get currentCarsPage(): number {
    return this._currentCarsPage;
  }

  set currentCarsPage(value: number) {
    this._currentCarsPage = value;
  }

  get currentWinnersPage(): number {
    return this._currentWinnersPage;
  }

  set currentWinnersPage(value: number) {
    this._currentWinnersPage = value;
  }

  get startTime(): number {
    return this._startTime;
  }

  set startTime(value: number) {
    this._startTime = value;
  }

  get winners(): WinnerInformation[] {
    return this._winners;
  }

  get countWinners(): number {
    return this._countWinners;
  }

  get sortColumn(): string {
    return this._sortColumn;
  }

  set sortColumn(value: string) {
    this._sortColumn = value;
  }

  get isSortDirectionASC(): boolean {
    return this._isSortDirectionASC;
  }

  set isSortDirectionASC(value: boolean) {
    this._isSortDirectionASC = value;
  }

  get isRaceMode(): boolean {
    return this._isRaceMode;
  }

  setMode(isRaceMode: boolean) : void {
    this._isRaceMode = isRaceMode;
    this._view.disableModeButtons(this);
  }
}
