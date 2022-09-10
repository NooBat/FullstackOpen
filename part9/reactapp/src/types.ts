interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptivePart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptivePart {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSpecialPart extends CourseDescriptivePart {
  type: 'special';
  requirements: string[];
}

interface CourseSubmissionPart extends CourseDescriptivePart {
  type: 'submission';
  exerciseSubmissionLink: string;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSpecialPart
  | CourseSubmissionPart;
