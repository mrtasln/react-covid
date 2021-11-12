import {CovidState, CovidStateAction} from "../../types/covidState";

const defaultState: CovidState = {

    activeState: "cases"
};

const covidStateReducer = (state = defaultState, action: CovidStateAction) => {

    switch (action.type) {

        case "SELECT_STATE":
            return {...state, activeState: action.payload};

        default:
            return state;

    }
};

export default covidStateReducer;