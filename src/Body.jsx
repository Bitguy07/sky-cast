import React, { useRef, useState, useEffect } from 'react';
import CountryPannel from './CountryPannel';
import DropButton from './assets/Icon.png';
import navigation from './assets/navigation.png'
import Button from './Button';
import WeatherDiscription from './WeatherDiscription';

const Body = ({weatherData, city}) => {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [click, setClick] = useState(true);
  const [click01, setClick01] = useState(null);
  const [selectedData, setSelectedData] = useState(null);


  const corausol = useRef(null); 
  const subCorausol = useRef(null);
  const corausalCard = useRef(null);
  const cardWidthRef = useRef(0);

  
  const handleScroll = (direction) => {
    if (subCorausol.current) {
      const maxScroll = subCorausol.current?.scrollWidth - corausol.current?.clientWidth;

      // Update scroll position based on direction
      const newScrollPosition =
        direction === 'left'
          ? Math.min(scrollPosition + cardWidthRef.current, maxScroll)
          : Math.max(scrollPosition - cardWidthRef.current, 0);

      setScrollPosition(newScrollPosition);
      subCorausol.current.scrollLeft = newScrollPosition;
    }

    
  };

  const moveRight = () => {
    handleScroll('right');
  };

  const moveLeft = () => {
    handleScroll('left');
  };

  const isClick = () => {
    setClick((click) => !click);
  }

  function HourData({data}) {
    return(
                <>
                      <div className={`h-full min-w-24 rounded-lg ml-5 ${data?.sys?.pod === `n` ? `bg-gradient-to-b from-[#373153] to-[#bcbac5]` : `bg-gradient-to-b from-[#f4725b] to-[#ecdbc8] `}`} ref={corausalCard}>
                        <div className='w-full h-full'>

                          {/* time  */}
                          <div className='h-[16%] w-full flex items-center justify-center'>
                            <h1 className='font-extrabold text-sm '>{`${String(data?.dt_txt.split(" ")[1].split(":")[0] % 12 || 12).padStart(2, '0')}:${String(data?.dt_txt.split(" ")[1].split(":")[1]).padStart(2, '0')}`}</h1>
                          </div>

                          {/* icon */}
                          <div className='h-[26%] w-full relative  flex items-center justify-center'>
                            <img src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`} alt="sun.png" className='sm:h-11 sm:w-11 h-14 w-14 absolute'/>
                          </div>

                          {/* Digree  */}
                          <div className='h-[16%] w-full flex items-center justify-center'>
                            <h1 className='font-extrabold text-sm '>{`${Math.floor(data.main.temp)}`}°C</h1>
                          </div>

                           {/* icon */}
                          <div className='h-[26%] w-full flex items-center justify-center'>
                            <img src={navigation} alt="navigation.png"style={{transform: `rotate(${data?.wind?.deg}deg)`}} className='sm:h-7 sm:w-7 h-11 w-10 '/>

                          </div>
                          
                          {/* wind speed */}
                          <div className='h-[16%] w-full flex items-center justify-center'>
                            <h1 className='font-bold text-sm '>{`${Math.round(data?.wind?.speed * 3.6)}`}km/h</h1>
                          </div>

                        </div>
                      </div>
                </>
    )
  }

  let buttonData = [];

  if (weatherData && weatherData.filteredData) {
    buttonData = Object.keys(weatherData.filteredData).slice(0, 5).map(datekey => {
          const dateEntries = weatherData.filteredData[datekey] || [];

            if (dateEntries.length > 0) {

                // Get the first entry for summary purposes (or other single data needs)
                const dayData = dateEntries[0];
                // Keep all entries for the date to handle time-specific data separately
                const dateTimeData = dateEntries.map(entry => entry);

            return {
                      date: datekey,
                      data: dayData,
                      dateTimeData: dateTimeData
                    };
      } else {
        return null; // Skip this date if no dayData is found
      }
    }).filter(item => item !== null); // Remove any null values
  }

  //For Capitalized string
  function capitalizeWords(str) {
    return str
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join the words back together
  }
  
    useEffect(() => {
      
      // Only set selectedData initially if it's null
      if (buttonData.length > 0) {
        setSelectedData(buttonData[0].dateTimeData);
        setClick01(null);
      }
    }, [weatherData]);

    useEffect(() => {
      if (corausol.current && corausalCard.current) {
        setTimeout(() => {
          cardWidthRef.current = corausalCard.current.clientWidth + 20; // card width + margin
        }, 0); // Allow a short delay for DOM rendering
      }
    }, [selectedData])

  return (
    <div className='w-screen flex grow flex-col'>

        {/* Upper Portion */}
        <div className='sm:h-1/2 h-[48%] sm:flex sm:flex-row flex flex-col w-screen '>
            <div className='sm:h-full sm:pb-7 sm:pt-2 sm:pl-10 sm:pr-5 px-4 h-[29%] sm:order-1 order-2 sm:w-[40%]'>
                {/* first section */}
                <div className='bg-[rgb(217,217,217)] items-center rounded-lg shadow-[5px_5px_7px_rgba(0,0,0,0.7)] justify-center flex h-full w-full'>
                <CountryPannel city = {city} weatherData={weatherData} capitalizeWords={capitalizeWords} />
                </div>
            </div>
            <div className='sm:h-full h-[66%] pb-5 px-4 flex items-center sm:pb-7 sm:pt-2 sm:pr-10 sm:pl-5 justify-center sm:order-2 order-1 sm:w-[60%]'>
                {/* second section */}
                <WeatherDiscription data={selectedData} citydata = {weatherData?.city}/>
            </div>
        </div>



          {/* Lower Portion  */}
        <div className={`sm:h-1/2 ${click ? `h-[68%]`:`h-[40%]`} w-screen sm:flex sm:flex-row flex flex-col`}>
            <div className={`sm:h-full ${click ? `h-[20%]`:`h-full`} sm:w-[37%] sm:pl-10 pt-[1px] px-4 pb-2 `}>

              {/* third section  */}
              <div className='bg-[rgb(217,217,217)] shadow-[5px_5px_7px_rgba(0,0,0,0.7)] rounded-lg  w-full h-full'>
                <div className='h-full w-full'>
                <div className={`sm:h-[18%] ${click ? `h-full`:`h-[20%]`} w-full flex`}>
                  <div className='h-full sm:w-full w-[85%] flex items-center justify-center'>
                  <h1 className='font-extrabold text-2xl'>5 Days Forecast:</h1>
                  </div>
                  <div className={`w-[15%] sm:hidden h-full ${click ? `rotate-0`:`rotate-180`} flex items-center pt-2 justify-center`}>
                    <button onClick={isClick}>
                      <img src={DropButton} alt="DropButton" className='h-4 w-6' />
                    </button>
                  </div>
                </div>

                {/* Day, Date,Temperaure, Weater Block */}
                <div className={`${click ? `h-[82%] hidden`:`h-[80%] block`} w-full sm:block`}>
                  <div className='h-full w-full border-t border-black grid grid-rows-5'>
                    {weatherData && buttonData.map((data, index) => (
                        <Button key={data.date} data={data.data}
                         onClick={() => { 
                                          setSelectedData(data.dateTimeData); 
                                          setClick01(index);
                                          setClick(isClick);
                                  }}
                         isLastIndex = {index >= 4}
                         firstButton = {click01 === null && index === 0}
                         isSame={click01 === index}
                         />
                      ))
                    }
                  </div>
                </div>  
                </div>   
              </div>
            </div>
                          {/* forth section  */}

            <div  className={`sm:h-full sm:w-[63%] h-[60%] ${click ? `block`:`hidden`} sm:pl-5 sm:pt-[1px] sm:pb-2  px-4 pt-2 sm:pr-10`}>
              <div className='h-full w-full  bg-[rgb(217,217,217)] shadow-[5px_5px_7px_rgba(0,0,0,0.7)] rounded-lg '>
                <div className='w-full sm:h-[18%] h-[25%] flex items-center justify-center '>
                  <h1 className='font-bold text-xl'>Hourly Forecast:</h1>
                </div>

                <div className='sm:h-[62%] h-[75%] w-full sm:px-4' >
                  <div className='h-full w-full' ref={corausol}>

                    {/* corausol section */}
                    <div className='h-full pb-5 sm:pb-0 flex min-w-full overflow-x-auto font-bold text-3xl no-scrollbar scroll-smooth ease-out' ref={subCorausol}>
                        { selectedData && selectedData.map((data, index) => <HourData data={data} key={index} />)}
                   </div>
                  </div>
                  
                </div>
                {/* button section */}
                <div className={`w-full h-[20%] hidden ${selectedData && selectedData.length<5? `sm:hidden`:`sm:block`}`}>
                      <div className='flex h-full w-full'>
                      <div className='h-full w-1/2 flex items-center justify-center'>
                        <button onClick={moveRight}>
                          <img src={DropButton} alt="left button" className='h-6 w-4 rotate-90' />
                        </button>
                      </div>
                      <div className='h-full w-1/2 flex items-center justify-center'>
                        <button onClick={moveLeft}>
                          <img src={DropButton} alt="left button" className='h-6 w-4 -rotate-90' />
                        </button>
                      </div>
                      </div>
                </div>
              </div>
            </div>
        </div>
        <div className='h-24 sm:hidden block  bottom-0 absolute w-full px-4'>
          <div className=' flex h-full w-full items-center justify-center'>
              <h1 className='text-3xl font-serif font-bold  bg-gradient-to-l from-[#282828] to-[#9d9b9b] bg-clip-text text-transparent'>SkyCast</h1>
          </div>
        </div>

        
    </div>
  )
}

export default Body