export default class Constants {
  public static readonly baseUrl: string = 'http://127.0.0.1:3000';

  public static readonly apiGarage: string = `${this.baseUrl}/garage`;

  public static readonly apiEngine: string = `${this.baseUrl}/engine`;

  public static readonly apiWinners: string = `${this.baseUrl}/winners`;

  public static readonly limitPage: number = 7;

  public static readonly startPage: number = 1;

  public static readonly carsAmountGenerate = 100;

  public static readonly containerWidth = 1220;

  public static readonly engineBrokenErrorMessage = 'engine was broken';

  public static readonly limitPageWinners: number = 10;

  public static readonly startPageWinners: number = 1;

  public static readonly timeSort: string = 'time';

  public static readonly winsSort: string = 'wins';

  public static readonly sortDirectionASC: string = 'ASC';

  public static readonly sortDirectionDESC: string = 'DESC';

  public static readonly winnerDetermineInterval: number = 100;

  public static readonly arrowUp = ' &#8593';

  public static readonly arrowDown = ' &#8595;';
}
