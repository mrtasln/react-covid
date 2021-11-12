import {Country, CountryDispatch} from "../../types/country";
import {Worldwide} from "../../types/worldwide";


export const selectCountry = (iso: string) => async (dispatch: CountryDispatch) => {

    dispatch({type: "SELECT_COUNTRY", payload: iso});
};

export const changeActiveCountry = (country: Country) => async (dispatch: CountryDispatch) => {

    dispatch({type: "CHANGE_ACTIVE_COUNTRY", payload: country});
};

export const setWorldWideInfo = (worldwide: Worldwide) => async (dispatch: CountryDispatch) => {

    dispatch({type: "SET_WORLDWIDE_INFO", payload: worldwide});
};