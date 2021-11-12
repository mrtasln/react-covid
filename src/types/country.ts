import {ThunkDispatch} from "redux-thunk";
import {Worldwide} from "./worldwide";

export interface Country {
    updated: number;
    country: string;
    countryInfo: CountryInfo;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    continent: string;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
}
export interface CountryInfo {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
}

export interface CountryState {
    data: Country[];
    selectedCountry: string;
    activeCountry: Country;
    worldwide: Worldwide;
}

interface SELECT_COUNTRY {
    type: "SELECT_COUNTRY",
    payload: string
}

interface CHANGE_ACTIVE_COUNTRY {
    type: "CHANGE_ACTIVE_COUNTRY",
    payload: Country
}

interface SET_WORLDWIDE_INFO {
    type: "SET_WORLDWIDE_INFO",
    payload: Worldwide
}

export type CountryAction = SELECT_COUNTRY | CHANGE_ACTIVE_COUNTRY | SET_WORLDWIDE_INFO;
export type CountryDispatch = ThunkDispatch<CountryState, void, CountryAction>;