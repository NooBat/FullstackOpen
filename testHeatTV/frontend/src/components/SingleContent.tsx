// import { Badge } from '@material-ui/core';
// import React from 'react';
import './SingleContent.css';

export interface DataAPIProps {
    id: number;
    name: string;
    image: { medium: string, original: string };
};

export const SingleContent = ({dataAPI}: {dataAPI:DataAPIProps}) => {
    const { name, image } = dataAPI;
    const { medium } = image;
    return (
        <div className='part'>
            <img src={medium} alt={name} />
            <div className = 'textDecor'>
                <p id='textSingleContent'>{name}</p>
            </div>
        </div>
    );
};