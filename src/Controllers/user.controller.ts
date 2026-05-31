import { Request, Response } from "express";
import { UserResponse } from "../DTO/Responses";
import { UserRequest, UserSchema } from "../DTO/Requests";
import { AppError } from "../Utilities";
import { getUser, updateUser } from "../Services/user.service";

export class UserController {
  static async get(req: Request, res: Response) {
    const { id } = req.params;
    const user: UserResponse = await getUser(id);

    return res.status(200).json(user);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const parsed = UserSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError("Invalid request body", 400, parsed.error.issues);
    }

    const requestData: UserRequest = parsed.data;
    const user: UserResponse = await updateUser(id, requestData);

    return res.status(200).json(user);
  }
}