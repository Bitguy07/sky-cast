import React, { useState, useEffect } from 'react';
import {calculateLocalTime} from './localTimeStamp.js'
import Sunrise from './assets/sunrise-white.png';
import Sunset from './assets/sunset-white.png';
import Wind from './assets/wind.png';
import Humidity from './assets/humidity.png';
import Pressure from './assets/pressure.png';
import visibility from './assets/visibility.png';

const WeatherDiscription = ({ data, citydata }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const [filteredEntries, setFilteredEntries] = useState([]);
  const [suntime, setSuntime] = useState({
    sunriseHour: '',
    sunriseMinute: '',
    sunriseAmPm: '',
    sunsetHour: '',
    sunsetMinute: '',
    sunsetAmPm: ''
  });

  function updateSunTimes() {
    const sunriseTime = calculateLocalTime(citydata.sunrise);
    const sunsetTime = calculateLocalTime(citydata.sunset);

    setSuntime({
      sunriseHour: sunriseTime.hour,
      sunriseMinute: sunriseTime.minute,
      sunriseAmPm: sunriseTime.AmPm,
      sunsetHour: sunsetTime.hour,
      sunsetMinute: sunsetTime.minute,
      sunsetAmPm: sunsetTime.AmPm
    });
  }

  const getNearCurrentTimeEntries = () => {
    const currentHour = new Date().getHours();
    const entriesByHour = data.map((entry) => ({
      ...entry,
      hour: new Date(entry.dt * 1000).getHours()
    }));
  
    // Sort entries by their hour in ascending order of the difference from the current hour
    const sortedEntries = entriesByHour.sort((a, b) => {
      const diffA = Math.abs(a.hour - currentHour);
      const diffB = Math.abs(b.hour - currentHour);
      return diffA - diffB;
    });
  
    // Take the closest entry to the current hour
    const nearestEntries = sortedEntries.length > 0 ? [sortedEntries[0]] : [];
    
    return nearestEntries;
  };
  

  useEffect(() => {
    setFilteredEntries(getNearCurrentTimeEntries());

    const intervalID = setInterval(() => {
      setFilteredEntries(getNearCurrentTimeEntries());
    },1000);

    const intervalId = setInterval(updateSunTimes, 1000); 

    return () => {
      clearInterval(intervalID);
      clearInterval(intervalId);
    }
  }, [data]);

  return (
    <>
            <div className='h-full w-full bg-[rgb(217,217,217)] flex rounded-lg shadow-[5px_5px_7px_rgba(0,0,0,0.7)]'>
                    <div className='w-[33.33%] text-center flex items-center flex-col justify-center'>

                      {/* weather description */}
                    < div>
                        <div className='text-start' >
                            <div className='text-5xl  font-black'>{`${Math.floor(filteredEntries[0]?.main.temp)}`}°C</div>
                            <div className='flex gap-1 -mt-2 items-center'><div className='font-semibold text-sm'>Feels like: </div> <span className='text-xl font-bold'>{`${Math.floor(filteredEntries[0]?.main.feels_like)}`} °C</span></div>
                        </div>
                     </div>


                      <div className='h-1/2 w-full flex items-center justify-center'>
                          <div className=''>
                              <div className='flex items-center sm:p-0 pb-4 justify-center' >
                                <div>
                                  {/* icon */}
                                  <img src={Sunrise} alt="sunrise.png" className='h-6 w-6 mt-2 mr-4' />
                                </div>
                                <div>
                                  <h1 className='sm:font-750 font-medium'>Sunrise</h1>
                                  <p className='text-xs sm:font-semibold font-medium -mt-1'>{`${suntime?.sunriseHour}:${suntime?.sunriseMinute} ${suntime?.sunriseAmPm}`}</p>
                                </div>
                              </div>
                              <div className='flex items-center justify-center' >
                                <div>
                                  {/* icon */}
                                  <img src={Sunset} alt="sunrise.png" className='h-6 w-6 mt-2 mr-4' />
                                </div>
                                <div>
                                  <h1 className='sm:font-750 font-medium'>Sunset</h1>
                                  <p className='text-xs sm:font-semibold font-medium -mt-1'>{`${suntime?.sunsetHour}:${suntime?.sunsetMinute} ${suntime?.sunsetAmPm}`}</p>
                                </div>
                          </div>
                      </div>

                      </div>
                    </div>


                    <div className='w-[33.33%]  relative h-full'>
                      {/* weather icon */}
                      <div className='h-1/2 flex items-center sm:top-5 top-8 absolute justify-center w-full'>
                        <div className=''>
                          <img src={`https://openweathermap.org/img/wn/${filteredEntries[0]?.weather[0].icon}@2x.png`} alt="Sun.png" className='h-36 w-36' />
                        </div>
                      </div>
                      <div className='h-1/2 w-full flex absolute bottom-0 justify-center pt-8'>
                        <div className=''> 
                          <h1 className='font-bold text-xl '>{`${filteredEntries[0]?.weather[0].main}`}</h1>
                        </div>
                      </div>
                    </div>


                    <div className='w-[33.33%] h-full'>
                      {/* weather parameter */}
                      <div className='w-full h-full items-center grid gap-2 grid-cols-2 p-3 grid-rows-2'>
                        {/* first element  */}
                        <div className=''> 
                          <div className='w-full flex justify-center'>
                            <img src={Humidity} alt="Humidity.png"  className='h-9 w-12'/>
                          </div>
                         <h1 className='font-bold text-xs text-center'>{`${filteredEntries[0]?.main.humidity}`}%</h1>
                         <p className='text-center font-normal text-xs'>Humidity</p>
                        </div>

                        {/* second element  */}
                        <div className=''> 
                          <div className='w-full flex justify-center'>
                            <img src={Wind} alt="wind.png"  className='h-9 w-12'/>
                          </div>
                         <h1 className='font-bold text-xs text-center'>{`${Math.round(filteredEntries[0]?.wind.speed * 3.6)}`}km/h</h1>
                         <p className='text-center font-normal text-xs'>Wind</p>
                        </div>

                        {/* third element  */}
                        <div className=''> 
                          <div className='w-full flex justify-center'>
                            <img src={Pressure} alt="Pressure.png"  className='h-9 w-10'/>
                          </div>
                         <h1 className='font-bold text-xs text-center'>{`${filteredEntries[0]?.main.pressure}`}hPa</h1>
                         <p className='text-center font-normal text-xs'>Pressure</p>
                        </div>
                        {/* fourth element  */}
                        <div className=''> 
                          <div className='w-full flex justify-center'>
                            <img src={visibility} alt="uv.png"  className='h-10 w-9'/>
                          </div>
                         <h1 className='font-bold text-xs text-center'>{`${Math.round((filteredEntries[0]?.visibility / 1000) * 2) / 2}`} km</h1>
                         <p className='text-center font-normal text-xs'>Visibility </p>
                        </div>
                      </div>
                    </div>
                </div>
    </>
  )
}

export default WeatherDiscription