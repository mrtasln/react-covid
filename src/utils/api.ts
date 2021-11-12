import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return axios.create({
        baseURL: "https://disease.sh/v3/covid-19/",
        headers: {
            "Content-type": "application/json"
        }
    })
}

