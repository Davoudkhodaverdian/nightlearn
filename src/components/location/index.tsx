"use client";

import React, { useRef } from "react";

const LocationCmp: React.FC = () => {

  const locationBtn = useRef<HTMLButtonElement>(null);
  const getLocation = (event: React.MouseEvent<HTMLButtonElement>) => {

    // console.log(event);
    // console.log("Get Location");
    console.log({ geolocation: navigator.geolocation });
    if (!navigator.geolocation) console.log("geolocation isn't supported");
    else {
      const geoSuccess: PositionCallback = (position: GeolocationPosition) => {
        console.log({ position });
        console.log({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude
        });
      }
      const geoError: PositionErrorCallback = (positionError: GeolocationPositionError) => {
        console.log({ positionError });
        switch (positionError?.code) {
          case 0:
            console.log('unknown error', { positionError });
            break;
          case 1:
            console.log('permission denied', { positionError });
            break;
          case 2:
            console.log('position unavailable', { positionError });
            break;
          case 3:
            console.log('timed out', { positionError });
            break;
          default:
            console.log('unknown error', { positionError });
            break;
        }
      }
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }
  }

  return (
    <main>
      <h1>Location</h1>
      <button ref={locationBtn} onClick={getLocation} type="button">Get Location</button>
    </main>
  )
}
export default LocationCmp;