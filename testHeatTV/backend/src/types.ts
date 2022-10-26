export enum TypesOfShow {
  Animation = 0,
  Scripted = 1,
  Reality = 2,
}

export interface Show {
  id: string;
  name: string;
  type: TypesOfShow;
  language: string;
  genres: string[];
  status: string;
}

export interface Context {
  getUser: () => Express.User | undefined;
  logout: () => void;
}
