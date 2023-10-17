import HtmlHelper from './htmlHelper';

export default class InitHtmlView {
  init(): void {
    this.drawHeaderView();
    this.drawWinnersView();
    this.drawSettingsView();
    this.drawCarsView();
    this.drawPaginationView();
    this.drawModalView();
  }

  private drawWinnersView(): void {
    const sectionWinnersEL = HtmlHelper.createElement('section', '', ['winners'], '');
    const containerEl = HtmlHelper.createElement('div', '', ['container'], '');
    const mainCarsEl = HtmlHelper.createElement('div', '', ['main-cars'], '');
    const h2El = HtmlHelper.createElement('h2', '', ['title'], 'Winners - ');
    const winnersCountSpanEl = HtmlHelper.createElement('span', 'winnersCount', null, '');
    const h3El = HtmlHelper.createElement('h3', '', ['page'], 'Page #');
    const winnersPageSpanEl = HtmlHelper.createElement('span', 'winnersPage', null, '');
    const tableEl = HtmlHelper.createElement('table', 'table', ['table'], '');
    
    const trEl = this.getTableHeaderRow();
    
    tableEl.append(trEl);
    h2El.append(winnersCountSpanEl);
    h3El.append(winnersPageSpanEl);
    mainCarsEl.append(h2El);
    mainCarsEl.append(h3El);
    mainCarsEl.append(tableEl);
    containerEl.append(mainCarsEl);
    sectionWinnersEL.append(containerEl);
    document.body.append(sectionWinnersEL);
  }

  private drawCarsView(): void {
    const sectionEl = HtmlHelper.createElement('section', '', ['main'], '');
    const containerEl = HtmlHelper.createElement('div', '', ['container'], '');
    const carLinesEl = HtmlHelper.createElement('div', 'carLines', ['main-cars'], '');
    const h2El = HtmlHelper.createElement('h2', '', ['title'], 'Garage - ');
    const garageCarsNumberEl = HtmlHelper.createElement('span', 'garageCarsNumber', null, '');
    const h3El = HtmlHelper.createElement('h3', '', ['page'], 'Page #');
    const spanCurrentCarsPageEl = HtmlHelper.createElement('span', 'spanCurrentCarsPage', null, '');
    h2El.append(garageCarsNumberEl);
    h3El.append(spanCurrentCarsPageEl);
    carLinesEl.append(h2El);
    carLinesEl.append(h3El);
    containerEl.append(carLinesEl);
    sectionEl.append(containerEl);
    document.body.append(sectionEl);
  }

  private drawHeaderView(): void {
    const headerEl = HtmlHelper.createElement('header', '', null, '');
    const containerEl = HtmlHelper.createElement('div', '', ['container'], '');
    const btnGarageEl = HtmlHelper.createElement('button', 'btnGarage', ['header-garage', 'button'], 'to garage');
    const btnWinnersEl = HtmlHelper.createElement('button', 'btnWinners', ['header-winner', 'button'], 'to winners');

    containerEl.append(btnGarageEl);
    containerEl.append(btnWinnersEl);
    headerEl.append(containerEl);
    document.body.append(headerEl);
  }

  private drawPaginationView(): void {
    const paginationEl = HtmlHelper.createElement('section', '', ['pagination'], '');
    const containerEl = HtmlHelper.createElement('div', '', ['container'], '');
    const prevBtnEl = HtmlHelper.createElement('button', 'prevBtn', ['button', '_blue'], 'prev');
    const nextBtnEl = HtmlHelper.createElement('button', 'nextBtn', ['button', '_blue'], 'next');

    containerEl.append(prevBtnEl);
    containerEl.append(nextBtnEl);
    paginationEl.append(containerEl);
    document.body.append(paginationEl);
  }

  private drawSettingsView(): void {
    const settingsEl = HtmlHelper.createElement('section', '', ['settings'], '');
    const containerEl = HtmlHelper.createElement('div', '', ['container'], '');

    const raceBtnEl = this.getRaceButtonElement();
    const resetBtnEl = this.getResetButtonElement();
    const generateCarsBtnEl = this.getGenerateButtonElement();
    const settingsControlEl = this.getSettingsControlElement();

    containerEl.append(settingsControlEl);
    containerEl.append(raceBtnEl);
    containerEl.append(resetBtnEl);
    containerEl.append(generateCarsBtnEl);
    settingsEl.append(containerEl);
    document.body.append(settingsEl);
  }

  private drawModalView(): void {
    const sectionEl = HtmlHelper.createElement('section', 'myModal', ['modal'], '');
    const modalContentEl = HtmlHelper.createElement('p', '', ['modal-content'], '');
    const modelWinEl = HtmlHelper.createElement('span', 'modelWin', null, '');
    const timeWinSecondsEl = HtmlHelper.createElement('span', 'timeWinSeconds', null, '');
    const closeModalEl = HtmlHelper.createElement('span', 'closeModal', ['close'], '', '', '', false, '&times;');

    modalContentEl.append(modelWinEl);
    modalContentEl.innerHTML += ' went first (';
    modalContentEl.append(timeWinSecondsEl);
    modalContentEl.innerHTML += 's)';

    sectionEl.append(modalContentEl);
    sectionEl.append(closeModalEl);

    document.body.append(sectionEl);
  }

  private getSettingsControlElement(): HTMLElement {
    const settingsControlEl = HtmlHelper.createElement('div', '', ['settings-control'], '');
    const controlCreateEl = this.getCreateControlElement();
    const controlUpdateEl = this.getUpdateControlElement();
    settingsControlEl.append(controlCreateEl);
    settingsControlEl.append(controlUpdateEl);
    return settingsControlEl;
  }

  private getCreateControlElement(): HTMLElement {
    const controlCreateEl = HtmlHelper.createElement('div', '', ['control'], '');
    const createModelEl = HtmlHelper.createElement('input', 'createModel', null, '', 'text');
    const colorEl = HtmlHelper.createElement('input', 'createColor', ['control-create'], '', 'color', '#e66465');
    const createBtnEl = HtmlHelper.createElement('button', 'createBtn', ['button', '_blue'], 'create');
    controlCreateEl.append(createModelEl);
    controlCreateEl.append(colorEl);
    controlCreateEl.append(createBtnEl);
    return controlCreateEl;
  }

  private getUpdateControlElement(): HTMLElement {
    const controlUpdateEl = HtmlHelper.createElement('div', '', ['control'], '');
    const updateModelEl = HtmlHelper.createElement('input', 'updateModel', null, '', 'text');
    const updateColorEl = HtmlHelper.createElement('input', 'updateColor', ['control-update'], '', 'color', '#f6b73c');
    const updateCarBtnEl = HtmlHelper.createElement('button', 'updateCarBtn', ['button', '_blue'], 'update');
    controlUpdateEl.append(updateModelEl);
    controlUpdateEl.append(updateColorEl);
    controlUpdateEl.append(updateCarBtnEl);
    return controlUpdateEl;
  }

  private getRaceButtonElement(): HTMLElement {
    return HtmlHelper.createElement('button', 'raceBtn', ['header-winner', 'button'], 'race');
  }

  private getResetButtonElement(): HTMLElement {
    return HtmlHelper.createElement('button', 'resetBtn', ['header-winner', 'button'], 'reset', '', '', true);
  }

  private getGenerateButtonElement(): HTMLElement {
    return HtmlHelper.createElement('button', 'generateCarsBtn', ['header-winner', 'button', '_blue'], 'generate cars');
  }

  private getTableHeaderRow(): HTMLElement {
    const trEl = HtmlHelper.createElement('tr', '', null, '');
    const thNumberEl = HtmlHelper.createElement('th', '', null, 'Number');
    const thCarEl = HtmlHelper.createElement('th', '', null, 'Car');
    const thNameEl = HtmlHelper.createElement('th', '', null, 'Name');
    const thWinsEl = HtmlHelper.createElement('th', 'countWinsCeil', null, 'Wins');
    const thTimeWinCeilEl = HtmlHelper.createElement('th', 'timeWinCeil', null, 'Best time(seconds)');
    const countWinsSpanEl = HtmlHelper.createElement('span', 'countWins', null, '');

    const timeWinSpanEl = HtmlHelper.createElement('span', 'timeWin', null, '');
    thWinsEl.append(countWinsSpanEl);
    thTimeWinCeilEl.append(timeWinSpanEl);

    trEl.append(thNumberEl);
    trEl.append(thCarEl);
    trEl.append(thNameEl);
    trEl.append(thWinsEl);
    trEl.append(thTimeWinCeilEl);

    return trEl;
  }
}
