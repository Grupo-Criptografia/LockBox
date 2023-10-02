import axios from "axios";

const cryptoApi = axios.create({
    baseURL: "http://localhost:8000/api/"
})
export const getShift = (data) => {
    return cryptoApi.get("shift/", {
        params: data
    })
        .catch(error => {
            console.log("Error en la solicitud: ", error);
            throw error;
        })
};

export const getSubstitution = (data) => {
    return cryptoApi.get("substitution/", {
        params: data
    })
        .catch(error => {
            console.log("Error en la solicitud: ", error);
            throw error;
        })
};

export const createAffine = (data) => {
    return cryptoApi.post("affine/", data)
        .then(response => {
            console.log("Response from server:", response.data);
            return response.data;
        })
        .catch(error => {
            console.log("Error in the request:", error);
            throw error;
        });
};