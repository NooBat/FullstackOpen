import User from './models/user';

export const isString = (payload: unknown): payload is string =>
  typeof payload === 'string' || payload instanceof String;

export const createUser = async (
  provider: string,
  providerId: string,
  firstName: string,
  lastName: string,
  displayName: string,
  email: string,
  photoUrl: string
) => {
  const user = new User({
    provider,
    providerId,
    firstName,
    lastName,
    displayName,
    email,
    photoUrl,
  });

  try {
    await user.save();
  } catch (err) {
    if (isString(err)) {
      throw new Error(err);
    }
  }

  return user;
};
