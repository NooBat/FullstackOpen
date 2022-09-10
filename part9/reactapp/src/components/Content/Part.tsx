import { CoursePart } from '../../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
        </>
      );
    case 'groupProject':
      return (
        <>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    case 'submission':
      return (
        <>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </>
      );
    case 'special':
      return (
        <>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
