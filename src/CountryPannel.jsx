import React, { useEffect, useState } from 'react'
import axios from 'axios';

const CountryPannel = ({city, weatherData, capitalizeWords}) => {

    const [time, setTime] = useState(null);
    const [error, setError] = useState(null);
    const [ timeRelatedData, setTimeRelatedData ] = useState({
        dayName: '',    //Friday
        monthName: '',  //November
        dayNumber: '',  //15
        hours12: '', //12
        minutes: '', //30
        seconds: null, //03
        period: '' //PM
    });
    const apiKEY = import.meta.env.VITE_TIME_API;

    //Handle Time Data
    useEffect(() => {
        const fetchTimeZoneData = async () => {
            const API_Url = `https://api.ipgeolocation.io/timezone?apiKey=${apiKEY}&location=${city}`;

            try{
                const response  = await axios.get(API_Url);
                const fetchedData = response.data;
                setTime(fetchedData?.date_time);
            }catch (err){
                setError('Failed to fetch timezone data');
            }
        };

        fetchTimeZoneData();
    }, [city]);

  // Update time-related data every second
  useEffect(() => {
    if (time) {
      const [datePart, timePart] = time.split(' '); // Split into date and time
      const [year, month, day] = datePart.split('-').map(Number); // Extract date components
      const [hours, minutes, seconds] = timePart.split(':').map(Number); // Extract time components

      // Create a Date object using the fetched `time` as a base
      let localTime = new Date(year, month - 1, day, hours, minutes, seconds);

      const interval = setInterval(() => {
        // Increment the time by 1 second
        localTime = new Date(localTime.getTime() + 1000);

        // Format the updated time
        const dayName = localTime.toLocaleString('en-US', { weekday: 'long' }); // "Friday"
        const monthName = localTime.toLocaleString('en-US', { month: 'short' }); // "Nov"
        const dayNumber = String(localTime.getDate()).padStart(2, '0'); // "15"
        const updatedHour = localTime.getHours(); // 24-hour format
        const updatedMinutes = String(localTime.getMinutes()).padStart(2, '0'); // "30"
        const updatedSeconds = String(localTime.getSeconds()).padStart(2, '0'); // "03"
        const period = updatedHour >= 12 ? 'PM' : 'AM';
        const hours12 = updatedHour % 12 || 12;

        // Update state with the new formatted time
        setTimeRelatedData({
          dayName,
          monthName,
          dayNumber,
          hours12,
          minutes: updatedMinutes,
          seconds: updatedSeconds,
          period
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
    }, [time]);

  return (
    <>
        <div className='flex sm:flex-col sm:gap-0 gap-10 sm:items-center items-baseline relative sm:text-center'>
            <div className='flex sm:order-2 order-1 items-baseline'>
                <h1 className='sm:pl-3 font-black text-5xl'>
                    {`${timeRelatedData?.hours12}:${timeRelatedData?.minutes}`}
                </h1>
                <p>
                    {`${timeRelatedData?.period}`}
                </p>
            </div>

            <div className={`sm:font-750 absolute sm:relative pb-3 sm:right-auto top-[0px] sm:top-auto sm:left-auto sm:order-1 order-2 ${weatherData?.city?.name.length>8 ?`text-xs sm:text-xl left-[77%]` : `text-xl left-[72%]`}`}>
                {`${weatherData && weatherData.city ?capitalizeWords(weatherData.city.name):``}`}
            </div>

            <div className='sm:order-3 order-3 text-xs'>
                {`${timeRelatedData?.dayName}, ${timeRelatedData?.dayNumber} ${timeRelatedData?.monthName}`}
            </div>
        </div>
    </>
  )
}

export default CountryPannel