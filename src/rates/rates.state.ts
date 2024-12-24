import { makeAutoObservable } from "mobx";
import { getAssets } from "../services/asserts.api";
import { IAssets, ICurrency } from "./rates.types";

interface RatesState {
  loaded: boolean;
  rates: Array<ICurrency>;
  socket: WebSocket | null;
  wsTimestamp: number | null;
  fetchAssets(): Promise<void>;
  updateRatesWS(message: MessageEvent): void;
  subscribeRates(): void;
  unSubscribeRates(): void;
  setRates(rates: Array<ICurrency>): void;
  getRates(): Array<ICurrency>;
  setLoaded(loaded: boolean): void;
}

class RatesState implements RatesState {
  loaded: boolean = false;
  rates: Array<ICurrency> = [];
  socket: WebSocket | null = null;
  wsTimestamp: number | null = null;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchAssets<T extends IAssets<ICurrency>>() {
    const response: T | undefined = await getAssets()
    if (response === undefined) return;
    this.setRates(response.data)
    this.setLoaded(true)
  }

  updateRatesWS(message: MessageEvent) {
    const data = JSON.parse(message.data);
    const updatedRows = this.rates.map((eachItem: ICurrency) => {
        if (eachItem.id in data) {
          return {
            ...eachItem,
            priceUsd: data[eachItem.id]
          }
        } else {
          return eachItem
        }
    })
    this.setRates(updatedRows)
    this.wsTimestamp = Date.now()
  }

  subscribeRates() {
    if (this.socket) return;
    this.socket = new WebSocket(
      `wss://ws.coincap.io/prices?assets=ALL`
    );
    this.socket.addEventListener("message", this.updateRatesWS);
  }

  unSubscribeRates() {
    this.socket?.close()
    this.socket = null;
  }

  setRates(rates: Array<ICurrency>) {
    this.rates = rates
  }
  getRates(): Array<ICurrency> {
    return this.rates
  }
  setLoaded(loaded: boolean) {
    this.loaded = loaded
  }
}

export const ratesState = new RatesState();
