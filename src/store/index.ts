import {combineReducers} from "redux";
import countryReducer from "./reducers/countryReducer";
import {CountryState} from "../types/country";
import {CovidState} from "../types/covidState";
import covidStateReducer from "./reducers/covidStateReducer";

export interface AppState {
    country: CountryState;
    covidState: CovidState
}

const rootReducer = combineReducers<AppState>({
    country: countryReducer,
    covidState: covidStateReducer
});

export default rootReducer;