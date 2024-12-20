import React from 'react'

const Button = ({ data, onClick, isLastIndex, firstButton, isSame}) => {
  return (
    <>
        <button className={` h-full w-full ${isSame ? 'bg-[rgb(181,176,187)]' : 'hover:bg-[rgb(181,176,187)]'} ${firstButton ? `bg-[rgb(181,176,187)]` : ``} flex ${isLastIndex ? `rounded-b-lg `:`border-b border-black` } `} onClick ={onClick}>
            <div className='h-full w-1/2 flex items-center justify-between px-4'>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Cloud.png"  className='h-9 w-12 '/>
            <h1 className='font-bold text-base '>{`${Math.floor(data.main.temp)}`}°C</h1>
            </div>
            <div className='font-bold text-base px-2 h-full w-1/2 flex items-center justify-between'>
            <h1>{`${new Date(data.dt_txt.split(" ")[0].replace(/-/g, '/')).toLocaleString('en-US', { weekday: 'long' })},`}</h1>
            <h1>{`${new Date(data.dt_txt.split(" ")[0].replace(/-/g, '/')).getDate()} ${new Date(data.dt_txt.split(" ")[0].replace(/-/g, '/')).toLocaleString('en-US', { month: 'short' })}`}</h1>
            </div>
        </button>
    </>
  )
}

export default Button