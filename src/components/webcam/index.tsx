"use client";
import { useEffect } from "react";

const Webcam: React.FC = () => {

    const checkDevises = async () => {
        const devises = await navigator?.mediaDevices?.enumerateDevices();
        console.log({ devises })
    }
    const getUserMediaFunction = async () => {
        if ("mediaDevices" in navigator && !!navigator?.mediaDevices.getUserMedia) {
            try {
                checkDevises();
                const constraints = {
                    audio: true,
                    video: true,
                };
                const result = await navigator?.mediaDevices.getUserMedia(constraints);
                console.log({ result })

            } catch (error) {
                console.log({ error })
            }

        }
    }

    useEffect(() => {
        getUserMediaFunction();

    }, [])

    return (
        <main>
            kokko
        </main>
    )
}
export default Webcam;