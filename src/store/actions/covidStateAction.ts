import {CovidStateDispatch} from "../../types/covidState";

export const selectActiveCovidState = (state: string) => async (dispatch: CovidStateDispatch) => {

    dispatch({type: "SELECT_STATE", payload: state});
};
