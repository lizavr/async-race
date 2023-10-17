import EngineApi from '../api/engine/engineApi';
import Car from '../api/garage/car';
import CarRequest from '../api/garage/carRequest';
import GarageApi from '../api/garage/garageApi';
import WinnerInformation from '../api/winners/winnerInformation';
import WinnerRequest from '../api/winners/winnerRequest';
import WinnersApi from '../api/winners/winnersApi';
import Constants from '../constants';
import Model from '../model/model';
import CarsGenerator from '../utils/carsGenerator';

export default class Controller {
  model: Model;

  garageApi: GarageApi;

  engineApi: EngineApi;

  winnersApi: WinnersApi;

  constructor(model: Model, garageApi: GarageApi, engineApi: EngineApi, winnersApi: WinnersApi) {
    this.model = model;
    this.garageApi = garageApi;
    this.engineApi = engineApi;
    this.winnersApi = winnersApi;
    this.addListeners();
  }

  async loadData(): Promise<void> {
    await Promise.all([this.loadCars(), this.loadWinners()]);
  }

  private async loadCars(): Promise<void> {
    const res = await this.garageApi.getCarsData(this.model.currentCarsPage, Constants.limitPage);
    this.model.updateCars(res.response, res.count);
    this.addCarListeners();
    this.resetRaceButtons();
  }

  private async loadWinners(): Promise<void> {
    const res = await this.winnersApi.getWinnersData(
      this.model.currentWinnersPage,
      Constants.limitPageWinners,
      this.model.sortColumn,
      this.model.isSortDirectionASC ? Constants.sortDirectionASC : Constants.sortDirectionDESC
    );
    const carPromises = res.response.map(async (item) => {
      const car = await this.garageApi.getCar(item.id);
      return new WinnerInformation(item, car.name, car.color);
    });
    const winners = await Promise.all(carPromises);
    this.model.updateWinners(winners, res.count);
  }

  private addListeners() {
    this.addClickPageNameListener();
    this.addCreateCarListener();
    this.addClickOnPrevBtnListener();
    this.addClickOnNextBtnListener();
    this.addClickOnUpdateCarListener();
    this.addClickOnGenerateCarsBtnListener();
    this.addClickOnRaceBtnListener();
    this.addClickOnResetBtnListener();
    this.addClickOnArrowListener();
  }

  private addClickPageNameListener(): void {
    const toGarageBtn: HTMLElement | null = document.getElementById('btnGarage');
    const toWinnersBtn: HTMLElement | null = document.getElementById('btnWinners');
    if (!toGarageBtn) {
      return;
    }
    toGarageBtn.addEventListener('click', () => {
      this.model.changePage(true);
    });

    if (!toWinnersBtn) {
      return;
    }
    toWinnersBtn.addEventListener('click', () => {
      this.model.changePage(false);
    });
  }

  private addCarListeners() {
    this.addClickOnRemoveBtnListener();
    this.addClickOnSelectCarListener();
    this.addClickOnABtnListener();
    this.addClickOnBBtnListener();
  }

  private addCreateCarListener(): void {
    const createBtnEl: HTMLElement | null = document.getElementById('createBtn');
    if (!createBtnEl) {
      return;
    }
    createBtnEl.addEventListener('click', async () => {
      await this.createCar();
      await this.loadCars();
    });
  }

  private async createCar(): Promise<void> {
    const createColorEl = document.getElementById('createColor');
    if (!(createColorEl instanceof HTMLInputElement)) {
      return;
    }
    const colorAdded = createColorEl.value;

    const createModelEl = document.getElementById('createModel');
    if (!(createModelEl instanceof HTMLInputElement)) {
      return;
    }
    const createMod = createModelEl.value;

    const carRequest = new CarRequest(createMod, colorAdded);
    await this.garageApi.createNewCar(carRequest);
  }

  private addClickOnPrevBtnListener(): void {
    const prevBtnEl = document.getElementById('prevBtn');
    if (!prevBtnEl) {
      return;
    }
    prevBtnEl.addEventListener('click', async () => {
      if (this.model.isGarage) {
        if (this.model.currentCarsPage === 1) {
          return;
        }
        await this.decreaseNumberCarPage();
      } else {
        if (this.model.currentWinnersPage === 1) {
          return;
        }
        await this.decreaseNumberWinnerPage();
      }
    });
  }

  private async decreaseNumberCarPage(): Promise<void> {
    this.model.currentCarsPage -= 1;
    await this.loadCars();
  }

  private async decreaseNumberWinnerPage(): Promise<void> {
    this.model.currentWinnersPage -= 1;
    await this.loadWinners();
  }

  private addClickOnNextBtnListener(): void {
    const nextBtnEl = document.getElementById('nextBtn');
    if (!nextBtnEl) {
      return;
    }
    nextBtnEl.addEventListener('click', async () => {
      if (this.model.isGarage) {
        if (this.model.currentCarsPage === Math.ceil(this.model.countCars / Constants.limitPage)) {
          return;
        }
        await this.increaseNumberCarPage();
      } else {
        if (this.model.currentWinnersPage === Math.ceil(this.model.countWinners / Constants.limitPageWinners)) {
          return;
        }
        await this.increaseNumberWinnerPage();
      }
    });
  }

  private async increaseNumberCarPage(): Promise<void> {
    this.model.currentCarsPage += 1;
    await this.loadCars();
  }

  private async increaseNumberWinnerPage(): Promise<void> {
    this.model.currentWinnersPage += 1;
    await this.loadWinners();
  }

  private addClickOnRemoveBtnListener(): void {
    const removeBtnsEl = document.getElementsByClassName('remove-btn-js');
    if (!removeBtnsEl) {
      return;
    }
    [...removeBtnsEl].forEach((item) => {
      item.addEventListener('click', async (ev) => {
        if (!(ev.currentTarget instanceof HTMLElement)) {
          return;
        }
        const removingId = Number(ev.currentTarget.getAttribute('car-index'));
        await this.garageApi.removeCar(removingId);
        await this.winnersApi.removeWinner(removingId);
        await this.loadData();
        if (!this.model.cars.length && this.model.currentCarsPage !== 1) {
          await this.decreaseNumberCarPage();
        }
      });
    });
  }

  private addClickOnSelectCarListener(): void {
    const selectBtnsEL = document.getElementsByClassName('select-btn-js');
    if (!selectBtnsEL) {
      return;
    }
    [...selectBtnsEL].forEach((item) => {
      item.addEventListener('click', async (ev) => {
        if (!(ev.currentTarget instanceof HTMLElement)) {
          return;
        }
        const selectingId = Number(ev.currentTarget.getAttribute('car-index'));
        const selectingCar = this.model.cars.find((it) => it.id === selectingId);
        if (!selectingCar) {
          return;
        }
        this.model.selectCar(selectingCar);
      });
    });
  }

  private addClickOnUpdateCarListener(): void {
    const updateCarBtnEl = document.getElementById('updateCarBtn');
    if (!updateCarBtnEl) {
      return;
    }
    updateCarBtnEl.addEventListener('click', async () => {
      const updateColorEl = document.getElementById('updateColor');
      const updateModelEl = document.getElementById('updateModel');
      if (!(updateColorEl instanceof HTMLInputElement) || !(updateModelEl instanceof HTMLInputElement)) {
        return;
      }
      const inputUpdateColor = updateColorEl.value;
      const inputUpdateModel = updateModelEl.value;
      const carRequest = new CarRequest(inputUpdateModel, inputUpdateColor);
      if (!this.model.selectedCar) {
        return;
      }
      await this.garageApi.updateCar(carRequest, this.model.selectedCar.id);
      await this.loadData();
    });
  }

  private addClickOnGenerateCarsBtnListener(): void {
    const generateCarsBtnEl = document.getElementById('generateCarsBtn');
    if (!generateCarsBtnEl) {
      return;
    }
    generateCarsBtnEl.addEventListener('click', async () => {
      const arrCars = CarsGenerator.generateCars();
      arrCars.forEach(async (item) => {
        await this.garageApi.createNewCar(item);
      });
      await this.loadCars();
    });
  }

  private addClickOnABtnListener(): void {
    const aBtns = document.getElementsByClassName('aBtn-js');
    const raceBtn = document.getElementById('raceBtn');
    if (!aBtns) {
      return;
    }
    [...aBtns].forEach((item) => {
      item.addEventListener('click', async (ev) => {
        if (!(ev.currentTarget instanceof HTMLButtonElement)) {
          return;
        }
        const button = ev.currentTarget;
        const carNumber = Number(ev.currentTarget.getAttribute('car-index'));
        button.disabled = true;
        if (raceBtn instanceof HTMLButtonElement) {
          raceBtn.disabled = true;
        }
        await this.moveCar(carNumber);
      });
    });
  }

  private addClickOnRaceBtnListener(): void {
    const raceBtn = document.getElementById('raceBtn');
    const resetBtnEl = document.getElementById('resetBtn');
    if (
      !raceBtn ||
      !(raceBtn instanceof HTMLButtonElement) ||
      !resetBtnEl ||
      !(resetBtnEl instanceof HTMLButtonElement)
    ) {
      return;
    }
    raceBtn.addEventListener('click', async () => {
      this.model.setMode(true);
      raceBtn.disabled = true;
      resetBtnEl.disabled = false;
      this.model.cars.forEach((item) => this.moveCar(item.id));
      this.startStopWatch();
      const setIntervalId = setInterval(async () => {
        const finishedCars = this.model.cars.filter((item) => item.finishTime);
        if (finishedCars.length) {
          clearInterval(setIntervalId);
          const winnerCar = finishedCars.sort((a, b) => a.finishTime - b.finishTime)[0];
          this.model.setWinner(winnerCar);
          await this.addWinner(winnerCar);
          await this.loadWinners();
        }
      }, Constants.winnerDetermineInterval);
    });
  }

  private async addWinner(winnerCar: Car): Promise<void> {
    const carFromApiWinners = await this.winnersApi.getWinner(winnerCar.id);

    if (carFromApiWinners) {
      const timeMin = Math.min(carFromApiWinners.time, (winnerCar.finishTime - this.model.startTime) / 1000);
      const winnerRequest = new WinnerRequest(winnerCar.id, carFromApiWinners.wins + 1, timeMin);
      await this.winnersApi.updateWinner(winnerRequest, winnerCar.id);
      return;
    }
    const winnerRequest = new WinnerRequest(winnerCar.id, 1, (winnerCar.finishTime - this.model.startTime) / 1000);
    await this.winnersApi.createWinner(winnerRequest);
  }

  private async moveCar(carNumber: number): Promise<void> {
    if (!carNumber) {
      return;
    }
    const carStartedCharacteristics = await this.engineApi.start(carNumber);
    this.model.startCar(carNumber, carStartedCharacteristics);
    const bBtn = document.querySelector(`.bBtn-js[car-index="${carNumber}"]`);
    if (bBtn instanceof HTMLButtonElement) {
      bBtn.disabled = false;
    }
    try {
      await this.engineApi.drive(carNumber);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === Constants.engineBrokenErrorMessage) {
        const carBroken = this.model.cars.find((item) => item.id === carNumber);
        if (!carBroken) {
          return;
        }
        carBroken.isDriving = false;
        carBroken.isBroken = true;
      }
    }
  }

  private addClickOnBBtnListener(): void {
    const raceBtn = document.getElementById('raceBtn');
    const bBtns = document.getElementsByClassName('bBtn-js');
    if (!bBtns) {
      return;
    }
    [...bBtns].forEach((item) => {
      item.addEventListener('click', async (ev) => {
        if (!(ev.currentTarget instanceof HTMLButtonElement)) {
          return;
        }
        const button = ev.currentTarget;
        button.disabled = true;
        const carNumber = Number(ev.currentTarget.getAttribute('car-index'));
        await this.stopMove(carNumber);
        const aBtn = document.querySelector(`.aBtn-js[car-index="${carNumber}"]`);
        if (aBtn instanceof HTMLButtonElement) {
          aBtn.disabled = false;
        }
        if (
          raceBtn instanceof HTMLButtonElement &&
          !this.model.isRaceMode &&
          this.model.cars.every((it) => it.isStopped)
        ) {
          raceBtn.disabled = false;
        }
      });
    });
  }

  private addClickOnResetBtnListener(): void {
    const raceBtnEl = document.getElementById('raceBtn');
    const resetBtnEl = document.getElementById('resetBtn');
    if (
      !resetBtnEl ||
      !raceBtnEl ||
      !(raceBtnEl instanceof HTMLButtonElement) ||
      !(resetBtnEl instanceof HTMLButtonElement)
    ) {
      return;
    }
    resetBtnEl.addEventListener('click', async () => {
      resetBtnEl.disabled = true;
      await Promise.all(this.model.cars.map((item) => this.stopMove(item.id)));
      raceBtnEl.disabled = false;
      this.model.setMode(false);
    });
  }

  private async stopMove(carNumber: number): Promise<void> {
    if (!carNumber) {
      return;
    }
    const carCharacteristics = await this.engineApi.stop(carNumber);
    await this.model.stopCar(carNumber, carCharacteristics);
  }

  private startStopWatch(): void {
    const start = Date.now();
    this.model.startTime = start;
  }

  private addClickOnArrowListener(): void {
    const tableEl = document.getElementById('table');
    const countWinsCeilEl = document.getElementById('countWinsCeil');
    const countWinsArrowEl = document.getElementById('countWins');
    const timeWinCeilEl = document.getElementById('timeWinCeil');
    const countTimeArrowEl = document.getElementById('timeWin');
    if (!tableEl) {
      return;
    }
    tableEl.addEventListener('click', async (ev) => {
      if (ev.target === countWinsCeilEl || ev.target === countWinsArrowEl) {
        this.changeSortProps(Constants.winsSort);
      }
      if (ev.target === timeWinCeilEl || ev.target === countTimeArrowEl) {
        this.changeSortProps(Constants.timeSort);
      }
      await this.loadWinners();
    });
  }

  private changeSortProps(columnSort: string): void {
    if (this.model.sortColumn === columnSort) {
      this.model.isSortDirectionASC = !this.model.isSortDirectionASC;
    } else {
      this.model.sortColumn = columnSort;
      this.model.isSortDirectionASC = true;
    }
  }

  private resetRaceButtons(): void {
    const buttonIds = ['raceBtn', 'resetBtn', 'createBtn', 'updateCarBtn', 'generateCarsBtn'];

    buttonIds.forEach((buttonId) => {
      const buttonEl = document.getElementById(buttonId);
      if (!buttonEl || !(buttonEl instanceof HTMLButtonElement)) {
        return;
      }
      buttonEl.disabled = false;
    });

    const resetBtnEl = document.getElementById('resetBtn');
    if (resetBtnEl && resetBtnEl instanceof HTMLButtonElement) {
      resetBtnEl.disabled = true;
    }
  }
}
