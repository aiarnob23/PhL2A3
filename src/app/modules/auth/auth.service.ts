import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import { User } from "../users/users.model";
import { createToken } from "./auth.utils";
import config from "../../config";
import { CustomError } from "../../errors/customError";

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const userData = await User.isUserExistsByEmail(payload.email);

  if (!userData) {
    throw new CustomError("This user is not found!", httpStatus.NOT_FOUND, [
      { path: "email", message: "User not found!" },
    ]);
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, userData?.password)))
    throw new CustomError("Password does not match!", httpStatus.FORBIDDEN, [
      { path: "password", message: "Incorrect password" },
    ]);

  //create token and sent to the client
  const jwtPayload = {
    userEmail: userData.email,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const { password, ...userDetails } = (userData as any).toObject();

  return {
    refreshToken,
    userData: userDetails,
  };
};

export const AuthService = {
  loginUser,
};
