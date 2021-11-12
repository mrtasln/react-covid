import {Country, CountryAction, CountryState} from "../../types/country";
import {Worldwide} from "../../types/worldwide";

const defaultState: CountryState = {

    data: [] as Country[],
    activeCountry: {} as Country,
    selectedCountry: "all",
    worldwide: {} as Worldwide
};

const countryReducer = (state: CountryState = defaultState, action: CountryAction) => {

    switch (action.type) {

        case "SELECT_COUNTRY":
            return {...state, selectedCountry: action.payload};
        case "CHANGE_ACTIVE_COUNTRY":
            return {...state, activeCountry: action.payload};
        case "SET_WORLDWIDE_INFO":
            return {...state, worldwide: action.payload};
        default:
            return state;

    }
};

export default countryReducer;