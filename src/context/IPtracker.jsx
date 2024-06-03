import { createContext, useState, useContext } from 'react';
import { fetchCountryData, fetchData } from '../services/data/fetchData';
import { isDomainOrIP } from '../services/utils/utils';
import { getTimeAndHoursFromOffset } from '../services/utils/utils';

const IPtrackerContext = createContext();

export const useIPtracker = () => useContext(IPtrackerContext);

export const IPtrackerProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [country, setCountry] = useState(null);
    const [flag, setFlag] = useState(null);
    const [time, setTime] = useState(null);
    const [countryCode, setCountryCode] = useState('');
    const [loading, setLoading] = useState('');

    const getData = async () => {
        setLoading('loading')
           try {
              const data = await fetchData(`${import.meta.env.VITE_APP_API_URL}${import.meta.env.VITE_APP_API_KEY}`);
              if (!data) {
                  throw new Error('Request failed!')
              }
              setLoading('success')
              setData(data)
              setCountryCode(data.location.country)
              console.log(data.location.timezone)
             setTime(getTimeAndHoursFromOffset(data.location.timezone));
          } catch (error) {
              setLoading('error')
              console.error(error)
          } 
    }

    const getSearchData = async (search) => {
        setLoading('loading');
        const searchData = isDomainOrIP(search);
        if (searchData === 'Invalid') {
            setLoading('error');
            return;
        }
        let queryParam = '';
        if (searchData === 'IPv4' || searchData === 'IPv6') {
            queryParam = `&ipAddress=${search}`;
        } else if (searchData === 'Domain') {
            queryParam = `&domain=${search}`;
        }

        try {
            const data = await fetchData(`${import.meta.env.VITE_APP_API_URL}${import.meta.env.VITE_APP_API_KEY}${queryParam}`);
            if (!data) {
                throw new Error('Request failed!');
            }
            setData(data);
            setCountryCode(data.location.country)
            setTime(getTimeAndHoursFromOffset(data.location.timezone));
            setLoading('success');
        } catch (error) {
            console.error(error);
            setLoading('error');
        }
    };

    const getCountry = async () => {
        setLoading('loading');
        try {
            if (countryCode) {
                const data = await fetchCountryData(`${import.meta.env.VITE_APP_API_URL_COUNTRY_NAME}${countryCode.toLowerCase()}`);
                if (!data) {
                    throw new Error('Request failed!');
                }
                setCountry(data);
                setFlag(data.flags.png);
                setLoading('success');
            }
        } catch (error) {
            console.error(error);
            setLoading('error');
        }
    };
    return (
        <IPtrackerContext.Provider value={{ data, loading, flag, country, time, getData, getSearchData, getCountry, setCountryCode }}>
            {children}
        </IPtrackerContext.Provider>
    );
};