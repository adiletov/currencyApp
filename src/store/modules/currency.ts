import {axiosApi} from "@/core/axiosApi";
import {SET_CURRENCY_DATA, SET_DEFAULT_CURRENCY} from "./types";
import {CURRENCY_LABEL} from "../../constants";

export enum CurrencyType {
    rub = 'rub',
    eur = 'eur',
    usd = 'usd',
    kzt = 'kzt',
    brl = 'brl',
    idr = 'idr'
}

export const currencyModule = {
    state: {
        currencyData: {},
        defaultCurrency: CurrencyType.rub
    },
    getters: {
        defaultCurrency: (state) => state.defaultCurrency,
        currencyDataList(state) {
            return Object.keys(state.currencyData).reduce((acc, key) => {
                const isCurrencyByDefault = key.startsWith(state.defaultCurrency.toString())
                if (isCurrencyByDefault) {
                    const name = key.split('-')?.[1]
                    acc.push({name, value: state.currencyData[key]})
                }
                return acc;
            }, []);
        },
        currencyData: (state) => state.currencyData,
        currencyList: () => {
            return [
                {id: CurrencyType.usd, name: CURRENCY_LABEL[CurrencyType.usd]},
                {id: CurrencyType.rub, name: CURRENCY_LABEL[CurrencyType.rub]},
                {id: CurrencyType.eur, name: CURRENCY_LABEL[CurrencyType.eur]},
                {id: CurrencyType.kzt, name: CURRENCY_LABEL[CurrencyType.kzt]},
                {id: CurrencyType.brl, name: CURRENCY_LABEL[CurrencyType.brl]},
                {id: CurrencyType.idr, name: CURRENCY_LABEL[CurrencyType.idr]},
            ]
        }
    },
    mutations: {
        [SET_CURRENCY_DATA]: (state, payload) => {
            state.currencyData = payload;
        },
        [SET_DEFAULT_CURRENCY]: (state, payload) => {
            state.defaultCurrency = payload;
        }
    },
    actions: {
        async getCurrency({commit}) {
            try {
                const res = await axiosApi.get('/currency')
                commit(SET_CURRENCY_DATA, res.data);
            } catch (e) {
                console.error(e);
            }
        },
    }
}
