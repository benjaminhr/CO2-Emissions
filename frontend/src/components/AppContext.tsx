import React from 'react'

export interface IEmissionsData {
  countryName: string;
  key: string;
  year: string;
  value: string;
}

export interface AppContextInterface {
  change(key: string, val: string): void;
  value: string;
  map: any;
  currentCordinates: number[];
  emissionsData: IEmissionsData[] | [];
}

const context = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = context.Provider;
export const AppContextConsumer = context.Consumer;

