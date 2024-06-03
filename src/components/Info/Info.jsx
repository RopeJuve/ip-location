import { useState, useEffect } from "react";
import { useIPtracker } from "../../context/IPtracker"
import InfoLoader from "./InfoLoader";
import ipIcon from '../../assets/ip-address.svg'
import classNames from "classnames";


const Info = () => {
    const [search, setSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { data, loading, getSearchData, country, getCountry, time} = useIPtracker();
    const [toggle, setToggle] = useState(false)

    const infoClasses = classNames(
        'absolute top-0  w-[100vw] rounded-3xl z-50 h-[100vh] bg-[#1b1b1b] text-[#f5f5f5] lg:w-[30%]  lg:relative lg:left-0 lg:translate-x-[0] lg:translate-y-[0] lg:rounded-[0]  p-[1.5rem] flex flex-col gap-[3rem] md:w-[60vw] md:left-[50%] md:translate-x-[-50%]',
        {
            'translate-y-[90vh]': toggle === false,
            'translate-y-[60vh]': toggle
        }
    )

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
        <div className={infoClasses}>
            <button className="lg:hidden h-2 bg-[#c0c0c0] rounded-lg w-[35%] mx-auto translate-y-[-1.75rem] animate-pulse cursor-pointer" onClick={() => setToggle(!toggle)}></button>
            <h1 className="lg:hidden text-center text-[2rem] font-bold translate-y-[-3rem]">Ip info</h1>
            <div className="hidden lg:flex lg:flex-col gap-[1.5rem]">
                <h1 className='text-center font-bold text-[2rem]'>IP Tracker</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" className={inputClasses} placeholder='Search for any IP address or domain' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <p className="text-red-400">{errorMessage}</p>
                </form>
            </div>
            <div className="flex flex-col gap-[.5rem] translate-y-[-3.75rem] lg:translate-y-[0] md:mx-auto lg:mx-0">
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">Your <div className="w-[24px] h-[24px]" style={{ backgroundImage: `url(${ipIcon})` }}></div>:</h3>
                    <p>{data?.ip}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">Country:</h3>
                    <p>{country?.name?.common}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">Hostname:</h3>
                    <p>{data?.as?.domain}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">ASN:</h3>
                    <p>{data?.isp}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">City:</h3>
                    <p>{data?.location?.city}</p>
                </div>}
                {loading === 'loading' && <InfoLoader />}
                {loading === 'success' && <div className="flex gap-[.5rem] items-center">
                    <h3 className="font-semibold text-[1.3rem] flex gap-[.5rem] items-center">Current Time:</h3>
                    <p>{time}</p>
                </div>}
            </div>
        </div>

    )
}

export default Info