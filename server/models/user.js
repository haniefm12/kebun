// Importing mongoose and its Schema class
import mongoose from "mongoose";
import { Schema } from "mongoose";
// Importing bcrypt for password hashing
import bcrypt from "bcrypt";

// Defining the user schema
const userSchema = new Schema({
  // Name field with auto-capitalization
  name: {
    type: String,
    required: true,
    set: (v) => v.replace(/\b\w/g, (l) => l.toUpperCase()) 
  },
  // Email field with validation
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`
    }
  },
  // Password field with hashing
  password: {
    type: String,
    required: true,
    minlength: 8,
    set: (v) => bcrypt.hashSync(v, 10) 
  },
  // Phone number field with validation
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const phoneRegex = /^0?[0-9\s.-]{8,15}$/;
        return phoneRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`
    }
  },
  // Role field with enum values
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin'
  },
  // Image field with URL validation
  image: {
    type: String,
    validate: {
      validator: (v) => {
        const urlRegex = /(https?:\/\/[^\s]+)/;
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid image link`
    }
  }
});

//static signup method?
userSchema.statics.signup = async function(name, email, password, phoneNumber, role, image){
  const isEmailTaken = await this.findOne({ email });
  if (isEmailTaken) {
    throw new Error('Email already in use');
    }
    const user = await this.create({ name, email, password, phoneNumber, role, image });
    return user;
    };

// Creating the User model from the user schema
const User = mongoose.model("User", userSchema);
export default User;