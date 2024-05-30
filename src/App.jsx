import { useState, useEffect } from 'react'
import { fetchData } from './services/data/fetchData'
import 'leaflet/dist/leaflet.css'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet'

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    const getData = async () => {
      setLoading('Loading')
      try {
        const data = await fetchData(`${import.meta.env.VITE_APP_API_URL}${import.meta.env.VITE_APP_API_KEY}`);
        if (!data) {
          throw new Error('Request failed!')
        }
        setLoading('success')
        setData(data)
      } catch (error) {
        setLoading('error')
        console.log(error)
      }
    }
    getData()
  }, [])

  console.log(data)
  const [lat, lon] = [data?.location.lat, data?.location.lng]

  return (
    <div className=' h-[100vh] w-[100vw]'>
      {loading === 'Loading' && <h1>Loading...</h1>}
      {loading === 'success' &&
        <div className=' h-[100vh] w-[100vw]'>
          <MapContainer center={[lat, lon]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lon]}>
              <Popup>{data.location.city} {data.location.region}</Popup>
            </Marker>
          </MapContainer>
        </div>
      }
    </div>
  )
}

export default App
