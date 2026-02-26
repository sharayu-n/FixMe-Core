import { Request, Response } from 'express';
import { UserResponse } from '../DTO/Responses';
import { UserRequest, UserSchema } from '../DTO/Requests';
import { AppError } from '../Utilities';
import { UserService } from '../Services';
// import { AuthenticatedRequest } from '../Middlewares';

export class UserController {
  static async get(req: Request, res: Response) {
    const { id } = req.params;
    const user: UserResponse = await UserService.get(id);
    res.status(200).json(user);
  };

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const parsed = UserSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError("Invalid request body", 400, parsed.error.issues);
    }

    const requestData: UserRequest = parsed.data;
    const user: UserResponse = await UserService.update(id, requestData);
    res.status(201).json(user);
  }

  // static async authorize(req: AuthenticatedRequest, res: Response) {
  //   if (!req.user || !req.user.id) {
  //     throw new AppError("Please login first", 401);
  //   }

  //   const id = req.user.id;
  //   const user = await UserService.get(id);

  //   return res.status(200).json(user);
  // }
}
