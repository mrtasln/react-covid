import axios, {AxiosResponse} from "axios";
import {Country} from "../types/country";

const UlkeService = {

    async ulkeleriGetir(): Promise<Country[]> {
        const {data}: AxiosResponse<Country[]> = await axios.get<Country[]>("https://disease.sh/v3/covid-19/countries");
        return data;
    }
};

export default UlkeService;