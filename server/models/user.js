// Importing mongoose and its Schema class
import mongoose from "mongoose";
import { Schema } from "mongoose";
// Importing bcrypt for password hashing
import bcrypt from "bcrypt";
// Importing validator package
import validator from "validator";


// Defining the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    set: (v) => v.replace(/\b\w/g, (l) => l.toUpperCase())
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'admin'
  },
  image: {
    type: String,
    default: "none"
  }
});

//static signup method?
userSchema.statics.signup = async function(name, email, password, phoneNumber, role, image){
  if (!name ||!email ||!password ||!phoneNumber) {
    throw new Error('All fields are required');
  }
  
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email address');
  }
  
  if (!validator.isMobilePhone(phoneNumber, "any")) {
    throw new Error('Invalid phone number');
  }
  
  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    throw new Error('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol');
  }
  
  if (image &&!validator.isURL(image)) {
    throw new Error('Invalid image link');
  }
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const isEmailTaken = await this.findOne({ email });
  if (isEmailTaken) {
    throw new Error('Email already in use');
  }
  
  const user = await this.create({ name, email, password: hashedPassword, phoneNumber, role, image });
  return user;
};

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

// Creating the User model from the user schema
const User = mongoose.model("User", userSchema);
export default User;