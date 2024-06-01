import { useState, useEffect } from "react";
import { useIPtracker } from "../../context/IPtracker"
import InfoLoader from "./InfoLoader";
import ipIcon from '../../assets/ip-address.svg'
import classNames from "classnames";


const Info = () => {
    const [search, setSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { data, loading, getSearchData, country, getCountry} = useIPtracker();

    useEffect(() => {
        getCountry();
    }, [data])
    const inputClasses = classNames(
        'w-full py-[.8rem] px-[1.2rem] border-[.5px] outline-none rounded-md bg-[#292929]',
        {
            'border-red-400': loading === 'error' || errorMessage
        }
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading === 'error' || search === '') {
            setErrorMessage('Invalid IP address or domain!')
        } else {
            setErrorMessage('')
            getSearchData(search)
            setSearch('')
        }

    }
    return (
        <div className='bg-[#1b1b1b]  text-[#f5f5f5] w-[30%] p-[1.5rem] flex flex-col gap-[3rem]'>
            <div className="flex flex-col gap-[1.5rem]">
                <h1 className='text-center font-bold text-[2rem]'>IP Tracker</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" className={inputClasses} placeholder='Search for any IP address or domain' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <p className="text-red-400">{errorMessage}</p>
                </form>
            </div>
            <div className="flex flex-col gap-[.5rem]">
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">Your <div className="w-[24px] h-[24px]" style={{ backgroundImage: `url(${ipIcon})` }}></div>:</h3>
                    <p>{data.ip}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">Country:</h3>
                    <p>{country?.name?.common}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">Hostname:</h3>
                    <p>{data.as.domain}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">ASN:</h3>
                    <p>{data.isp}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">City:</h3>
                    <p>{data.location.city}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">Time Zone:</h3>
                    <p>{data.location.timezone}</p>
                </div>}
            </div>
        </div>

    )
}

export default Info