import {ThunkDispatch} from "redux-thunk";

export interface CovidState {
    activeState: string
}

interface SELECT_STATE {
    type: "SELECT_STATE",
    payload: string
}

export type CovidStateAction = SELECT_STATE;
export type CovidStateDispatch = ThunkDispatch<CovidState, void, CovidStateAction>;