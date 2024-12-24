import { makeAutoObservable } from "mobx";
import { getRatesApi } from "../services/rates.api";
import { PERCENTAGE } from "./exchange.constant";
import { ECyrrencyType, EExchangeSelect, ICurrencyRate } from "./exchange.types";
import { ICurrency } from "../rates/rates.types";

interface IExchangeState {
  from: ICurrency | null;
  to: ICurrencyRate | null;
  amount: string;
  percentage: number;
  loaded: boolean;
  rates: Array<ICurrencyRate>;
  socket: WebSocket | null;
  wsTimestamp: number;
}
class ExchangeState implements IExchangeState {
  from: ICurrency | null = null;
  to: ICurrencyRate | null = null;
  amount: string = '';
  percentage: number = 0;

  loaded: boolean = false;
  rates: Array<ICurrencyRate> = [];

  socket: WebSocket | null = null;
  wsTimestamp: number = 0;

  constructor({ percentage }: { percentage: number }) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.percentage = percentage
  }

  intersection<T extends { symbol: string }>(array: Array<T>, label: string) {
    const symbol = label === EExchangeSelect.To ?
      this.from?.symbol :
      this.to?.symbol
    
    return array.filter((item) => (
      item.symbol !== symbol
    ))
  }

  setToCurrency(to: ICurrencyRate | null) {
    this.to = to
  }
  getToCurrency(): ICurrencyRate | null {
    return this.to;
  }
  setFromCurrency(from: ICurrency | null) {
    this.from = from
  }
  setAmount(amount: string) {
    this.amount = amount
  }

  calculete<
    T extends ICurrency,
    U extends ICurrencyRate,
    V extends string>(from: T, to: U, amount: V): number {
    const value = Number(amount) * Number(from.priceUsd) / Number(to.rateUsd);
    return to?.type === ECyrrencyType.Fiat ?
      Number(value.toFixed(2)) :
      value;
  }

   calculeteWithPercentage<
    T extends ICurrency,
    U extends ICurrencyRate,
     V extends string>(from: T, to: U, amount: V):number {
     const value = this.calculete(from, to, amount) +
       (this.calculete(from, to, amount) *
         (this.percentage / 100));
     return to?.type === ECyrrencyType.Fiat ?
       Number(value.toFixed(2)) :
       value;
  }

  async fetchRates() {
    const response = await getRatesApi()
    this.setRates(response.data)
    this.setLoaded(true)
  }

  updateRatesWS(message: MessageEvent) {
    if (!this.from) return;
    const data = JSON.parse(message.data);
    const updatedFrom = {...this.from, priceUsd: data[this.from.id]}
    this.setFromCurrency(updatedFrom)
    this.wsTimestamp = Date.now()
  }

  subscribeRates(currency: string) {
    if (this.socket) return;
    this.socket = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${currency}`
    );
    this.socket.addEventListener("message", this.updateRatesWS);
  }

  unSubscribeRates() {
    this.socket?.close()
    this.socket = null;
  }

  setRates(rates: Array<ICurrencyRate>) {
    this.rates = rates
  }
  getRates(): Array<ICurrencyRate> {
    return this.rates
  }
  setLoaded(loaded: boolean) {
    this.loaded = loaded
  }
}

export const exchangeRates = new ExchangeState({percentage:PERCENTAGE});