import Car from '../api/garage/car';
import WinnerInformation from '../api/winners/winnerInformation';
import Constants from '../constants';
import Model from '../model/model';
import InitHtmlView from './initHtmlView';

export default class GeneralViews {
  drawContent(): void {
    const contentHtmlView = new InitHtmlView();
    contentHtmlView.init();
    this.addClosePopupListeners();
  }

  changeVisiblePage(model: Model): void {
    const settingsEl = document.getElementsByClassName('settings')[0];
    const mainEl = document.getElementsByClassName('main')[0];
    const winnersEl = document.getElementsByClassName('winners')[0];
    if (
      !settingsEl ||
      !mainEl ||
      !winnersEl ||
      !(settingsEl instanceof HTMLElement) ||
      !(mainEl instanceof HTMLElement) ||
      !(winnersEl instanceof HTMLElement)
    ) {
      return;
    }

    if (model.isGarage) {
      settingsEl.style.display = 'block';
      mainEl.style.display = 'block';
      winnersEl.style.display = 'none';
    } else {
      settingsEl.style.display = 'none';
      mainEl.style.display = 'none';
      winnersEl.style.display = 'block';
    }
  }

  drawCars(model: Model): void {
    const garageCarsNumberEl = document.getElementById('garageCarsNumber');
    const carLinesEl = document.getElementById('carLines');
    if (!garageCarsNumberEl || !carLinesEl) {
      return;
    }
    garageCarsNumberEl.innerHTML = `${model.countCars}`;

    const allCarLineEl = document.getElementsByClassName('car-line');
    [...allCarLineEl].forEach((item) => item.remove());

    model.cars.forEach((item) => {
      const carLineEL = this.createCarLineElement(item);
      carLinesEl.appendChild(carLineEL);
    });

    const spanCurrentCarsPageEl = document.getElementById('spanCurrentCarsPage');
    if (!spanCurrentCarsPageEl) {
      return;
    }
    spanCurrentCarsPageEl.innerHTML = model.currentCarsPage.toString();
  }

  private createCarLineElement(item: Car) {
    const carLineEL = document.createElement('div');
    carLineEL.classList.add('car-line');
    carLineEL.setAttribute('car-index', item.id.toString());
    const lineOptionsDiv = this.createLineOptionsDiv(item);
    const lineRoadDiv = this.createLineRoadDiv(item);
    carLineEL.appendChild(lineOptionsDiv);
    carLineEL.appendChild(lineRoadDiv);
    return carLineEL;
  }

  private createLineRoadDiv(item: Car) {
    const lineRoadDiv = document.createElement('div');
    lineRoadDiv.classList.add('line-road');
    const aBtn = this.createAButton(item);
    const bBtn = this.createBButton(item);
    const carWayDiv = this.createCarWayDiv(item);
    const carBlockSvg = this.createCarBlockSvg(item);
    carWayDiv.appendChild(carBlockSvg);
    const flagBlockSvg = this.createFlagBlockSvg();
    lineRoadDiv.appendChild(aBtn);
    lineRoadDiv.appendChild(bBtn);
    lineRoadDiv.appendChild(carWayDiv);
    lineRoadDiv.appendChild(flagBlockSvg);
    return lineRoadDiv;
  }

  private createLineOptionsDiv(item: Car) {
    const lineOptionsDiv = document.createElement('div');
    lineOptionsDiv.classList.add('line-options');
    const selectBtn = this.createSelectButton(item);
    const removeBtn = this.createRemoveButton(item);
    const itemName = document.createElement('p');
    itemName.textContent = item.name;
    lineOptionsDiv.appendChild(selectBtn);
    lineOptionsDiv.appendChild(removeBtn);
    lineOptionsDiv.appendChild(itemName);
    return lineOptionsDiv;
  }

  private createFlagBlockSvg() {
    const flagBlockSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    flagBlockSvg.classList.add('flag-block');

    const flagSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    flagSvgUse.classList.add('flag-svg');
    flagSvgUse.setAttribute('href', './assets/sprite/sprite.svg#flag');
    flagBlockSvg.appendChild(flagSvgUse);
    return flagBlockSvg;
  }

  private createSelectButton(item: Car) {
    const selectBtn = document.createElement('button');
    selectBtn.setAttribute('car-index', item.id.toString());
    selectBtn.classList.add('option-btn', 'button', '_blue', 'select-btn-js');
    selectBtn.textContent = 'select';
    return selectBtn;
  }

  private createRemoveButton(item: Car) {
    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('car-index', item.id.toString());
    removeBtn.classList.add('option-btn', 'button', '_blue', 'remove-btn-js');
    removeBtn.textContent = 'remove';
    return removeBtn;
  }

  private createCarBlockSvg(item: Car) {
    const carBlockSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    carBlockSvg.classList.add('car-block');

    const carSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    carSvgUse.classList.add('car-svg');
    carSvgUse.setAttribute('href', './assets/sprite/sprite.svg#car');

    carSvgUse.style.fill = item.color;

    carBlockSvg.appendChild(carSvgUse);
    return carBlockSvg;
  }

  private createCarWayDiv(item: Car) {
    const carWayDiv = document.createElement('div');
    carWayDiv.setAttribute('car-index', item.id.toString());
    carWayDiv.classList.add('car-way');
    return carWayDiv;
  }

  private createBButton(item: Car) {
    const bBtn = document.createElement('button');
    bBtn.setAttribute('car-index', item.id.toString());
    bBtn.classList.add('button', '_b', 'road', 'bBtn-js');
    bBtn.textContent = 'b';
    bBtn.disabled = true;
    return bBtn;
  }

  private createAButton(item: Car) {
    const aBtn = document.createElement('button');
    aBtn.setAttribute('car-index', item.id.toString());
    aBtn.classList.add('button', 'road', 'aBtn-js');
    aBtn.textContent = 'a';
    return aBtn;
  }

  updateCar(model: Model): void {
    const updateModelEl = document.getElementById('updateModel');
    const updateColorEl = document.getElementById('updateColor');
    if (!(updateColorEl instanceof HTMLInputElement) || !(updateModelEl instanceof HTMLInputElement)) {
      return;
    }
    if (!model.selectedCar) {
      return;
    }
    updateColorEl.value = model.selectedCar.color;
    updateModelEl.value = model.selectedCar.name;
  }

  animateCar(car: Car): void {
    const element = document.querySelector(`.car-way[car-index="${car.id}"]`);
    let start: number; let previousTimeStamp: number;
    let done = false;

    function step(timeStamp: number) {
      if (!element || !(element instanceof HTMLElement)) {
        return;
      }
      if (start === undefined) {
        start = timeStamp;
      }
      const elapsed = timeStamp - start;

      if (!car.isDriving && car.isStopped) {
        element.style.transform = `translateX(0)`;
        return;
      }
      if (!car.isDriving && car.isBroken) {
        return;
      }

      if (previousTimeStamp !== timeStamp) {
        const percentage = Math.min(elapsed / car.timeAnimation, 1);
        element.style.transform = `translateX(calc(min(70vw, ${Constants.containerWidth}px * 0.7) * ${percentage})`;
        if (percentage === 1) {
          done = true;
          const finishedCar = car;
          finishedCar.finishTime = Date.now();
        }
      }
      if (elapsed < car.timeAnimation) {
        previousTimeStamp = timeStamp;
        if (!done) {
          window.requestAnimationFrame(step);
        }
      }
    }
    window.requestAnimationFrame(step);
  }

  returnCarToStart(car: Car): void {
    const element = document.querySelector(`.car-way[car-index="${car.id}"]`);
    if (!element || !(element instanceof HTMLElement)) {
      return;
    }
    element.style.transform = `translateX(0)`;
  }

  showWinPopup(name: string, time: number): void {
    const popupEl = document.getElementById('myModal');
    const spanTimeEl = document.getElementById('timeWinSeconds');
    const spanNameEl = document.getElementById('modelWin');
    if (!popupEl || !spanNameEl || !spanTimeEl) {
      return;
    }

    popupEl.style.display = 'block';
    spanTimeEl.innerHTML = time.toString();
    spanNameEl.innerHTML = name;
  }

  addClosePopupListeners(): void {
    const popupEl = document.getElementById('myModal');
    const crossEl = document.getElementById('closeModal');
    const modalContentEl = document.getElementsByClassName('modal-content')[0];
    if (!popupEl || !crossEl || !modalContentEl) {
      return;
    }
    document.body.addEventListener('click', (ev) => {
      if (ev.target === crossEl || ev.target !== modalContentEl) {
        popupEl.style.display = 'none';
      }
    });
  }

  drawWinners(model: Model): void {
    const winnersCountEl = document.getElementById('winnersCount');
    const tableEl = document.getElementById('table');
    if (!winnersCountEl || !tableEl) {
      return;
    }
    winnersCountEl.innerHTML = `${model.countWinners}`;

    this.drawArrowSort(model, 'timeWin', Constants.timeSort);
    this.drawArrowSort(model, 'countWins', Constants.winsSort);

    const allWinnerLineEl = document.getElementsByClassName('winner-line');
    [...allWinnerLineEl].forEach((item) => item.remove());

    model.winners.forEach((item, index) => {
      const trEl = this.createRowElementForWinner(model, index, item);
      tableEl.append(trEl);
    });

    const spanCurrentWinnersPageEl = document.getElementById('winnersPage');
    if (!spanCurrentWinnersPageEl) {
      return;
    }
    spanCurrentWinnersPageEl.innerHTML = model.currentWinnersPage.toString();
  }

  private createRowElementForWinner(model: Model, index: number, item: WinnerInformation) {
    const trEl = document.createElement('tr');
    trEl.classList.add('winner-line');

    const tdIndEl = document.createElement('td');
    tdIndEl.innerHTML = ((model.currentWinnersPage - 1) * 10 + (index + 1)).toString();

    const tdImgEl = this.createCarImageCell(item);

    const tdModelEl = document.createElement('td');
    tdModelEl.innerHTML = item.name;

    const tdWinsEl = document.createElement('td');
    tdWinsEl.innerHTML = item.wins.toString();

    const tdTimeEl = document.createElement('td');
    tdTimeEl.innerHTML = item.time.toString();

    trEl.append(tdIndEl);
    trEl.append(tdImgEl);
    trEl.append(tdModelEl);
    trEl.append(tdWinsEl);
    trEl.append(tdTimeEl);
    return trEl;
  }

  private createCarImageCell(item: WinnerInformation) {
    const tdImgEl = document.createElement('td');

    const tdImgUseEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    tdImgUseEl.classList.add('car-svg');
    tdImgUseEl.classList.add('_win');
    tdImgUseEl.setAttribute('href', './assets/sprite/sprite.svg#car');
    tdImgUseEl.style.fill = item.color;

    const tdImgSvgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tdImgSvgEl.classList.add('car-block');
    tdImgSvgEl.classList.add('_win');

    tdImgSvgEl.append(tdImgUseEl);

    tdImgEl.append(tdImgSvgEl);
    return tdImgEl;
  }

  drawArrowSort(model: Model, elementId: string, sortColumn: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }
    if (model.sortColumn === sortColumn) {
      if (model.isSortDirectionASC) {
        element.innerHTML = Constants.arrowUp;
      } else {
        element.innerHTML = Constants.arrowDown;
      }
    } else {
      element.innerHTML = '';
    }
  }

  disableModeButtons(model: Model): void {
    const allBtnsForDisable: HTMLButtonElement[] = [];
    const createBtnEl = document.getElementById('createBtn') as HTMLButtonElement;
    const updateCarBtn = document.getElementById('updateCarBtn') as HTMLButtonElement;
    const generateCarsBtn = document.getElementById('generateCarsBtn') as HTMLButtonElement;
    const selectBtnsEl = document.getElementsByClassName('select-btn-js') as HTMLCollectionOf<HTMLButtonElement>;
    const removeBtnsEl = document.getElementsByClassName('remove-btn-js') as HTMLCollectionOf<HTMLButtonElement>;
    const aBtnsEl = document.getElementsByClassName('aBtn-js') as HTMLCollectionOf<HTMLButtonElement>;
    const bBtnsEl = document.getElementsByClassName('bBtn-js') as HTMLCollectionOf<HTMLButtonElement>;

    allBtnsForDisable.push(
      createBtnEl,
      updateCarBtn,
      generateCarsBtn,
      ...Array.from(selectBtnsEl),
      ...Array.from(removeBtnsEl),
      ...Array.from(aBtnsEl)
    );

    this.disableButtons(allBtnsForDisable, model.isRaceMode);
    this.disableButtons([...bBtnsEl], !model.isRaceMode);
  }

  private disableButtons(buttons: HTMLButtonElement[] , disabled: boolean) {
    buttons.forEach((item) => {
      const buttonToDisable = item;
      buttonToDisable.disabled = disabled;
    });
  }
}
