import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet'
import { Icon } from 'leaflet'
import { useIPtracker } from "../../context/IPtracker";
import  icon  from '../../assets/location-icon.svg'
import Loader from '../Loader/Loader';
import Error from '../Loader/Error/Error';
import PopupComponent from './PopupComponent';



const Map = () => {
    const { data, loading, getData, country } = useIPtracker();

    useEffect(() => {
        getData()
    }, [])


    const markerIcon = new Icon({
        iconUrl: icon,
        iconSize: [50],
    })
    return (
        <div className='z-0 lg:w-[70%]'>
            {loading === 'loading' && <Loader />}
            {loading === 'success' &&
                <div className=' h-[100vh] w-[100vw]'>
                    <MapContainer center={[data?.location?.lat, data?.location?.lng]} zoom={15} >
                        <TileLayer
                            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                        />
                        <Marker position={[data?.location?.lat, data?.location?.lng]} icon={markerIcon}>
                            <Popup>  
                                    <PopupComponent city={data?.location?.city} region={data?.location?.region} country={country}/> 
                            </Popup>    
                        </Marker>
                    </MapContainer>
                </div>
            }
            {loading === 'error' && <Error />}
        </div>
    )
}

export default Map