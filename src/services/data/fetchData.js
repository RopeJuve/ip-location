import IpInfo from "../mock/IpLocationInfo";

export const fetchData = async (url) => {
    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            return new IpInfo(data);
        }
        throw new Error('Request failed!');

    }catch(error){
        console.log(error);
    }
};