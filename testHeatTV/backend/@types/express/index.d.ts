declare global {
  namespace Express {
    interface User {
      id: string;
      provider: string;
      providerId: string;
      displayName: string;
      email: string;
      photoUrl: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }
  }
}

export {};
