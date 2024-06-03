import Info from "./components/Info/Info"
import MapContainer from "./components/MapContainer/MapContainer"


function App() {

  return (
    <div className='relative flex lg:flex lg:flex-row lg:overflow-hidden font-SpaceMono h-[100vh]'>
      <Info />
      <MapContainer />
    </div>
  )
}

export default App
