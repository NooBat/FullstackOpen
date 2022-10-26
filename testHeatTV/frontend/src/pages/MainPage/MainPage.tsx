// import { Grid, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { Pagination, Skeleton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyrightIcon from '@mui/icons-material/Copyright';

import { DataAPIProps, SingleContent } from '../../components/SingleContent';

import './MainPage.css';

const TakeDataAPI: DataAPIProps[] = [];

// fetch API: https://api.tvmaze.com/shows?page=1
// pagination +  lazy loading
export const MainPage = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const url = 'https://api.tvmaze.com/shows?page=1';
  const controller = new AbortController();
  const { signal } = controller;
  useEffect(() => {
    setTimeout(() => {
      if (state.length === 0) {
        fetch(url, { signal })
          .then((response) => response.json())
          .then((res) => {
            setState(res);
            setLoading(false);
          });
      }
    }, 1000);
  }, []);

  if (state.length > 0 && TakeDataAPI.length === 0) {
    // avoid rerender
    for (let i = 20; i < 40; i += 1) {
      TakeDataAPI.push(state[i]);
    }
  }
  // skeleton: medium (210x295)
  // find the page of pagination
  const handleChangePagination = () => {
    // Continue ...
  };
  return (
    <div className='body'>
      {loading ? (
        <div className='loadingSkeleton'>
          <Skeleton variant='rectangular' width={210} height={295} />
          <Skeleton variant='rectangular' width={210} height={295} />
          <Skeleton variant='rectangular' width={210} height={295} />
          <Skeleton variant='rectangular' width={210} height={295} />
          <Skeleton variant='rectangular' width={210} height={295} />
        </div>
      ) : (
        <div className='MainPage'>
          {TakeDataAPI.map((iter) => (
            <SingleContent key={iter.id} dataAPI={iter} />
          ))}
        </div>
      )}
      <div className='Pagination'>
        <Stack spacing={2}>
          <Pagination
            id='pagination'
            count={10}
            showFirstButton
            showLastButton
            onChange={handleChangePagination}
          />
        </Stack>
      </div>
      <div className='footer'>
        <hr />
        <div className='leftPartUpper'>
          <p id='text'>Follow us on: </p>
          <FacebookIcon />
          <RedditIcon />
          <InstagramIcon />
          <TwitterIcon />
        </div>
        <div className='leftPartLower'>
          <CopyrightIcon />
          <p id='text'>BringTheHeatTV</p>
        </div>
      </div>
    </div>
  );
};
