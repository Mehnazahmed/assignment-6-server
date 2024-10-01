/* eslint-disable no-useless-escape */
import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";
import config from "../../config";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import { IUserModel, TUser } from "./user.interface";

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      select: 0, // Prevent password from being selected by default
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: String, // array of user IDs (strings)
        default: [],
      },
    ],
    following: [
      {
        type: String, // array of user IDs (strings)
        default: [],
      },
    ],
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    passwordChangedAt: {
      type: Date,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumExpiresAt: {
      type: Date,
      default: null,
    },
    recipes: [
      {
        type: String, // array of recipe IDs (strings)
        default: [],
      },
    ],
    likedRecipes: [
      {
        type: String, // array of recipe IDs (strings)
        default: [],
      },
    ],
    comments: [
      {
        type: String, // array of comment IDs (strings)
        default: [],
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, IUserModel>("User", userSchema);
