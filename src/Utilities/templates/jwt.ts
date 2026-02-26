import jwt, { SignOptions, Secret } from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as Secret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    } as SignOptions
  );
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as Secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
    } as SignOptions
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as Secret);
};
