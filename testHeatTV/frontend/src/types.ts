export interface User {
  id: string;
  provider: string;
  providerId: string;
  displayName: string;
  email: string;
  photoUrl: string;
  favoriteShows: (Show | undefined)[];
  favoritePeople: (string | undefined)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: (string | undefined)[];
  status: string;
  runtime: number;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  averageRating: number | null;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
}
