import axios from "axios";

const cryptoApi = axios.create({
    baseURL: "http://localhost:8000/api/"
})
export const getShift = (data) => {
    console.log("Api", data);
    return cryptoApi.get("shift/", {
        params: data
    })
        .catch(error => {
            console.log("Error en la solicitud: ", error);
            throw error;
        })
};
