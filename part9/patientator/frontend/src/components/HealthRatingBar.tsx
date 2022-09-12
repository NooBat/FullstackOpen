import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating, { RatingProps } from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

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

const StyledRating = styled(Rating)<RatingProps>({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
});

const HealthRatingBar = ({ rating, showText }: BarProps) => (
  <div className='health-bar'>
    <StyledRating
      readOnly
      value={3 - rating}
      max={3}
      icon={<FavoriteIcon fontSize='inherit' />}
      emptyIcon={<FavoriteIcon fontSize='inherit' />}
      classes={{
        iconFilled: '#FF6D75',
        iconHover: '#FF3D47',
      }}
    />

    {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
  </div>
);

export default HealthRatingBar;
