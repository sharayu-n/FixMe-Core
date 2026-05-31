import prisma from "../Utilities/prisma";
import { UserRequest } from "../DTO/Requests";
import { UserResponse } from "../DTO/Responses";
import { AppError } from "../Utilities";

export async function getUser(data: string): Promise<UserResponse> {
  const userId = Number(data);

  if (Number.isNaN(userId)) {
    throw new AppError("Invalid user id!", 400);
  }

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User doesn't exist!", 404);
  }

  return {
    id: String(user.id),
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

export async function updateUser(
  id: string,
  data: UserRequest
): Promise<UserResponse> {
  const userId = Number(id);

  if (Number.isNaN(userId)) {
    throw new AppError("Invalid user id!", 400);
  }

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User doesn't exist!", 404);
  }

  const allowedFields: (keyof UserRequest)[] = ["name", "email", "phoneNumber"];

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => {
      return allowedFields.includes(key as keyof UserRequest) && value !== undefined;
    })
  ) as Partial<UserRequest>;

  if (Object.keys(updateData).length === 0) {
    throw new AppError("No valid fields provided for update", 400);
  }

  const updatedUser = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      name: updateData.name ?? user.name,
      email: updateData.email ?? user.email,
      phone: updateData.phoneNumber ?? user.phone,
      updated_at: new Date(),
    },
  });

  return {
    id: String(updatedUser.id),
    name: updatedUser.name ?? "",
    email: updatedUser.email ?? "",
    phone: updatedUser.phone ?? "",
    createdAt: updatedUser.created_at,
    updatedAt: updatedUser.updated_at,
  };
}