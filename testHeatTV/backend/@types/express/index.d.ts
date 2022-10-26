declare global {
  namespace Express {
    interface User {
      id: string;
      provider: string;
      providerId: string;
      firstName: string;
      lastName: string;
      displayName: string;
      email: string;
      photoUrl: string;
    }
  }
}

export {};
