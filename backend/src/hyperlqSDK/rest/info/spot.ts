import { SpotMeta, SpotClearinghouseState, SpotMetaAndAssetCtxs } from "../../types/index.js";
import { HttpApi } from "../../utils/helpers.js";
import { InfoType } from "../../types/constants.js";
import { SymbolConversion } from "../../utils/symbolConversion.js";

export class SpotInfoAPI {
  private httpApi: HttpApi;
  private symbolConversion: SymbolConversion;

  constructor(httpApi: HttpApi, symbolConversion: SymbolConversion) {
    this.httpApi = httpApi;
    this.symbolConversion = symbolConversion;
  }

  async getSpotMeta(rawResponse: boolean = false): Promise<SpotMeta> {
    const response = await this.httpApi.makeRequest({ type: InfoType.SPOT_META });
    return rawResponse
      ? response
      : await this.symbolConversion.convertResponse(response, ["name", "coin", "symbol"], "SPOT");
  }

  async getSpotClearinghouseState(user: string, rawResponse: boolean = false): Promise<SpotClearinghouseState> {
    const response = await this.httpApi.makeRequest({ type: InfoType.SPOT_CLEARINGHOUSE_STATE, user: user });
    return rawResponse
      ? response
      : await this.symbolConversion.convertResponse(response, ["name", "coin", "symbol"], "SPOT");
  }

  async getSpotMetaAndAssetCtxs(rawResponse: boolean = false): Promise<SpotMetaAndAssetCtxs> {
    const response = await this.httpApi.makeRequest({ type: InfoType.SPOT_META_AND_ASSET_CTXS });
    return rawResponse ? response : await this.symbolConversion.convertResponse(response);
  }
}
