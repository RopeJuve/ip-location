import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import ICON from '../../../assets/error.json';

const ErrorIcon = () => {
    const playerRef = useRef(null);
    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

    return (
        <Player
            ref={playerRef}
            colorize='#FF0000'
            size={200}
            icon={ICON}
        />
    )
}

export default ErrorIcon