import mongoose from 'mongoose';

const schema = new mongoose.Schema<Express.User>({
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    minLength: 1,
    default: 'Anonymous',
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: (email: string) => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
      },
      message: 'Please use a valid email',
    },
  },
  photoUrl: {
    type: String,
    trim: true,
  },
  shows: {
    type: [
      {
        type: String,
      },
    ],
    default: [],
  },
});

const User = mongoose.model<Express.User>('User', schema);

export default User;
