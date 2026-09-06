import { api } from "../config/Api";

export const fetchProducts = async () => {
    try {
        const response = await api.get("/products");
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};