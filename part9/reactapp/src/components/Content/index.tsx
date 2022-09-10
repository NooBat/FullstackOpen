import { CoursePart } from '../../types';

import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map((coursePart) => (
      <Part key={coursePart.name} part={coursePart} />
    ))}
  </>
);

export default Content;
