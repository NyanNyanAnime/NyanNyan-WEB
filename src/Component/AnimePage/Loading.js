import React from 'react';
import Logo from './Image/Logo3.png';

const Loading = () => {
    return (
        <div className='flex flex-col bgColorPrimary3 dark:bg-black items-center justify-center min-h-screen'>
            <img className='h-56 rounded-full spin' src={Logo} alt='Loading' />
        </div>
    );
};

export default Loading;