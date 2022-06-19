import { Schema } from 'mongoose';
// import { HmacSHA512 } from 'crypto-js'

import { Role, User } from '../../../domain/users/user.entity';

export const UserSchema = new Schema(
  {
    id: { type: String, required: true, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    avatar: { type: String },
    roles: [{ type: String, required: true, enum: Role }],
    password: { type: String, required: true, select: false },
    passwordResetToken: { type: String, default: null, select: false },
    passwordResetExpires: { type: Date, default: null, select: false },
  },
  {
    timestamps: true,
  },
);

// UserSchema.pre<IUserEntity>(['save'], function (next) {
//   if (this.password) {
//     const hashPassword = HmacSHA512(
//       this.password,
//       process.env.PASSWORD_SALT,
//     ).toString()

//     this.password = hashPassword
//   }
//   next()
// })

export interface IUserEntity extends Omit<User, '_id'>, Document {}
