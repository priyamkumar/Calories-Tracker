import axios from "axios";

export const searchFood = async (query) => {
    try {
        const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${query}.json`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data from OpenFoodFacts API", error);
        return null;
    }
};