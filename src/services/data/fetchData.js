import IpInfo from "../mock/IpLocationInfo";
import ipLocation from "../mock/ipLocation.json";
import country from "../mock/country.json";

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
 
/*     return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const response =  new IpInfo(ipLocation);
                resolve(response);

            } catch (err) {
                reject(err);
            }
        }, 1000)


    }) */
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
/*     return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const response =  country;
                resolve(response);

            } catch (err) {
                reject(err);
            }
        }, 100)


    }) */
};