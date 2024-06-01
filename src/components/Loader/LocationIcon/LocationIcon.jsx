import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import ICON from '../../../assets/location-pin.json';



const LocationIcon = () => {
    const playerRef = useRef(null);
    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

    return (
        <Player
            ref={playerRef}
            size={200}
            icon={ICON}
        />
    )
}

export default LocationIcon