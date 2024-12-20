import React, {useEffect} from 'react'
import image1 from './assets/image1.png'
export default function({input, setInput, handleSearch, setCity}){

    const handleSearchClick = () => {
        setCity(input);
    };
    
    useEffect(() => {
        window.onload = handleSearch();
      }, []);

    return(
    <div className='w-screen h-16 flex items-center sm:gap-10 gap-2 sm:px-10 px-4 justify-between'>
        {/* search bar */}       
            <div className='flex border-2 shadow-[0_0_15px_rgba(0,0,0,0.3)] h-[35px] border-gray-500 flex-grow rounded-3xl'>
                <button className='p-2   rounded-l-3xl bg-[#e9e8e8]' onClick={handleSearchClick}>
                    {/* search image */}
                    <img src={image1} className='w-4 h-full  mx-2' alt="search bar" />

                </button>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}  placeholder="Search for your preffered city..." className='bg-[#e9e8e8] h-full outline-none grow rounded-r-3xl' />
            </div>
            {/* location */}
            < >
                
                <div className='sm:items-center sm:block hidden cursor-default sm:h-[35px] h-[35px] sm:w-auto  sm:px-5'>
                    <h1 className='text-3xl font-serif font-bold  bg-gradient-to-l from-[#9cdffa] to-[#e0f6d4] bg-clip-text text-transparent'>SkyCast</h1>
                </div>
            </>
        
    </div>
    );
}