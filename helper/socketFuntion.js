import io from 'socket.io-client'
var socket = io()
import { useState, useEffect } from 'react'
const testSocket = (data) => {
    data.id = localStorage.getItem("iddata")
    console.log(data);
    socket.emit('test', data)
}
const commentSocket = (data) => {
    data.id = localStorage.getItem("iddata")
    socket.emit('comment', data)
}
const useAudio = (url) => {
    if (typeof Audio != 'undefined') {
        const [audio] = useState(new Audio(url));
        const [playing, setPlaying] = useState(false);

        const toggle = () => setPlaying(!playing);

        useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
            [playing]
        );

        useEffect(() => {
            audio.addEventListener('ended', () => setPlaying(false));
            return () => {
                audio.removeEventListener('ended', () => setPlaying(false));
            };
        }, []);

        return [playing, toggle];
    }
    return false
};

export {
    commentSocket,
    testSocket,
    useAudio
}