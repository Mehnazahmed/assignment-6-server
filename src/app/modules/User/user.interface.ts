/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
  bio?: string;
  followers: string[];
  following: string[];
  role: keyof typeof USER_ROLE;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
  isPremium: boolean;
  premiumExpiresAt?: Date;
  recipes: string[];
  likedRecipes: string[];
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
}

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
