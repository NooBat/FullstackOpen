import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
  },
  displayName: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: {
      validator: (email: string) => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
      },
      message: 'Please use an appropriate email',
    },
  },
  photoUrl: {
    type: String,
    trim: true,
    required: true,
  },
});

const User = mongoose.model('User', schema);

export default User;
