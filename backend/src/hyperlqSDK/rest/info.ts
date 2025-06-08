import { RateLimiter } from "../utils/rateLimiter.js";
import { GeneralInfoAPI } from "./info/general.js";
import { SpotInfoAPI } from "./info/spot.js";
import { PerpetualsInfoAPI } from "./info/perpetuals.js";
import { HttpApi } from "../utils/helpers.js";
import { SymbolConversion } from "../utils/symbolConversion.js";

import {
  AllMids,
  Meta,
  UserOpenOrders,
  FrontendOpenOrders,
  UserFills,
  UserRateLimit,
  OrderStatus,
  L2Book,
  CandleSnapshot,
} from "../types/index.js";

import { InfoType, ENDPOINTS } from "../types/constants.js";

export class InfoAPI {
  public spot: SpotInfoAPI;
  public perpetuals: PerpetualsInfoAPI;
  private httpApi: HttpApi;
  private generalAPI: GeneralInfoAPI;
  private symbolConversion: SymbolConversion;

  constructor(baseURL: string, rateLimiter: RateLimiter, symbolConversion: SymbolConversion) {
    this.httpApi = new HttpApi(baseURL, ENDPOINTS.INFO, rateLimiter);
    this.symbolConversion = symbolConversion;

    this.generalAPI = new GeneralInfoAPI(this.httpApi, this.symbolConversion);
    this.spot = new SpotInfoAPI(this.httpApi, this.symbolConversion);
    this.perpetuals = new PerpetualsInfoAPI(this.httpApi, this.symbolConversion);
  }

  async getAssetIndex(assetName: string): Promise<number | undefined> {
    return await this.symbolConversion.getAssetIndex(assetName);
  }

  async getInternalName(exchangeName: string): Promise<string | undefined> {
    return await this.symbolConversion.convertSymbol(exchangeName);
  }

  async getAllAssets(): Promise<{ perp: string[]; spot: string[] }> {
    return await this.symbolConversion.getAllAssets();
  }

  async getAllMids(rawResponse: boolean = false): Promise<AllMids> {
    return this.generalAPI.getAllMids(rawResponse);
  }

  async getUserOpenOrders(user: string, rawResponse: boolean = false): Promise<UserOpenOrders> {
    return this.generalAPI.getUserOpenOrders(user, rawResponse);
  }

  async getFrontendOpenOrders(user: string, rawResponse: boolean = false): Promise<FrontendOpenOrders> {
    return this.generalAPI.getFrontendOpenOrders(user, rawResponse);
  }

  async getUserFills(user: string, rawResponse: boolean = false): Promise<UserFills> {
    return this.generalAPI.getUserFills(user, rawResponse);
  }

  async getUserFillsByTime(
    user: string,
    startTime: number,
    endTime: number,
    rawResponse: boolean = false
  ): Promise<UserFills> {
    return this.generalAPI.getUserFillsByTime(user, startTime, endTime, rawResponse);
  }

  async getUserRateLimit(user: string, rawResponse: boolean = false): Promise<UserRateLimit> {
    return this.generalAPI.getUserRateLimit(user, rawResponse);
  }

  async getOrderStatus(user: string, oid: number | string, rawResponse: boolean = false): Promise<OrderStatus> {
    return this.generalAPI.getOrderStatus(user, oid, rawResponse);
  }

  async getL2Book(coin: string, rawResponse: boolean = false): Promise<L2Book> {
    return this.generalAPI.getL2Book(coin, rawResponse);
  }

  async getCandleSnapshot(
    coin: string,
    interval: string,
    startTime: number,
    endTime: number,
    rawResponse: boolean = false
  ): Promise<CandleSnapshot> {
    return this.generalAPI.getCandleSnapshot(coin, interval, startTime, endTime, rawResponse);
  }
}
