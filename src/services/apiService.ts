import {Country} from "../types/country";
import {AxiosResponse} from "axios";
import api from "../utils/api";

export default class ApiService {

    constructor() {
        console.log("API service called.");
    }

    async getAllCountries(activeState: string): Promise<Country[]> {
        const {data} : AxiosResponse<Country[]> = await api().get<Country[]>("countries");
        data.sort(function (c1, c2) {return (c2 as any)[activeState] as number - (c1 as any)[activeState] as number});
        return data;
    }
}