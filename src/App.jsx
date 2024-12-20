import React, { useEffect, useState } from 'react';
import Header from './Header';
import Body from './Body';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Get the API key from the .env file
  const apiKey = import.meta.env.VITE_WEATHER_API;

  // Function to handle city search
  const handleSearch = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {

        //Fetch the Data
        const response = await axios.get(url);
        const data = response.data;

        //Process data to filter based on dates  
        const filteredData = filterDataByDay(data.list);
        setError(null);

        //Create a combined object with city metadata and filtered weather data
        const outputData = {
          city: data.city,
          filteredData: filteredData
        };

        //Update stat with the processed data
        setWeatherData(outputData);

    } catch (error) {
      if (error.response) {
        setError('City not found. Please enter a valid city name.');
      } else if (error.request) {
        setError('Network issue. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  }

  useEffect(() => {
    //Function to get user location
    const getLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      }
      else{
        setError('Geolocation is not supported by your browser.');
      }
    };

    //Callback function for success in geolocation
    const showPosition = async (position) => {
      const { latitude, longitude } = position.coords;
      await getCityName(latitude, longitude);
    };


    //Callback  function for error in geolocation
    const showError = (error) => {
      setError('Unable to retrieve location.');
    }

    //Call geolocation on component mount
    getLocation();

  }, []);

  const getCityName = async (latitude, longitude) => {

    const cityURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    try{
      const respone = await axios.get(cityURL);
      const cityName = respone.data.name;
      setInput(cityName);
      setCity (cityName);
    } catch (error){
      console.error('Error fetching city data:', error);
      setInput('City not found');
    }

  }

  
  //Function to group weather data by day
  const filterDataByDay = (data) => {
    return data.reduce((acc,entry) => {
      const date = entry.dt_txt.split(' ')[0]; // Get date from dt_txt
      if (!acc[date]) acc[date] = []; // If date not in acc, add it with an empty array
      acc[date].push(entry); // Add entry to date array
      return acc;
    },{});
  };


  useEffect(() => {
    // Define the key press event handler
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        setCity(input)
      }
    };
  
    // Add the event listener on component mount
    window.addEventListener("keydown", handleKeyPress);
  
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  useEffect(() => {
    handleSearch();
    setInput('');
  }, [city]); 


  return (
    <h1 className="w-screen h-screen bg-gradient-to-l from-gray-500 flex flex-col">
      <Header input = {input} setInput = {setInput} handleSearch = {handleSearch} setCity={setCity}/>
      <Body weatherData = {weatherData} city = {city}  setError = {setError} />
    </h1>
  )
}

export default App;