import FavoriteIcon from '@mui/icons-material/Favorite';
import { Rating } from '@mui/material';

type BarProps = {
  rating: number;
  showText: boolean;
};

const HEALTHBAR_TEXTS = [
  'The patient is in great shape',
  'The patient has a low risk of getting sick',
  'The patient has a high risk of getting sick',
  'The patient has a diagnosed condition',
];

const HealthRatingBar = ({ rating, showText }: BarProps) => (
  <div className='health-bar'>
    <Rating
      readOnly
      value={4 - rating}
      max={4}
      icon={<FavoriteIcon fontSize='inherit' />}
      sx={{
        iconFilled: {
          color: '#FF6D75',
        },
        iconHover: {
          color: '#ff3d47',
        },
      }}
    />

    {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
  </div>
);

export default HealthRatingBar;
