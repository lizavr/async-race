import EngineApi from '../api/engine/engineApi';
import GarageApi from '../api/garage/garageApi';
import WinnersApi from '../api/winners/winnersApi';
import Controller from '../controller/controller';
import Model from '../model/model';
import GeneralViews from '../view/generalView';

export default class App {
  start() {
    const drawView = new GeneralViews();
    drawView.drawContent();
    const model = new Model(drawView);
    const garageApi = new GarageApi();
    const engineApi = new EngineApi();
    const winnersApi = new WinnersApi();
    const controller = new Controller(model, garageApi, engineApi, winnersApi);
    controller.loadData();
  }
}
