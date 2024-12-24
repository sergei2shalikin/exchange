export interface IRates<T extends ICurrencyRate> {
  data: Array<T>;
  timestamp: number;
}

export interface ICurrencyRate {
  id: string;
  symbol: string;
  currencySymbol: string;
  type: string;
  rateUsd: string;
};

export enum EExchangeSelect {
  From = 'From',
  To = 'To'
}

export enum ECyrrencyType {
  Fiat = 'fiat',
  Crypto = 'Crypto'
}