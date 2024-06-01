import IpInfo from "../mock/IpLocationInfo";
import Country from "../mock/Country";

export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return new IpInfo(data);
        }
        throw new Error('Request failed!');

    } catch (error) {
        console.log(error);
    }
};

export const fetchCountryData = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data[0];
        }
        throw new Error('Request failed!');

    } catch (error) {
        console.log(error);
    }
};