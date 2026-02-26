import { prisma } from "../Configs/prisma";
import { UserRequest } from "../DTO/Requests";
import { UserResponse } from "../DTO/Responses";
import { AppError } from "../Utilities";

export class UserService {
    static async get(data: string): Promise<UserResponse> {
        const user = await prisma.users.findUnique({
            where: {
                id: data
            }
        })

        if (!user) {
            throw new AppError("User doesn't exist!", 404);
        }

        const response: UserResponse = {
            id: user.id,
            name: user?.name ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            // role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at
        }
        return response;
    }
    static async update(id: string, data: UserRequest): Promise<UserResponse> {
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            throw new AppError("User doesn't exist!", 404);
        }

        const allowedFields: (keyof UserRequest)[] = ["name", "email", "phoneNumber"];
        const updateData = Object.fromEntries(
            Object.entries(data).filter(([key]) => allowedFields.includes(key as keyof UserRequest))
        );

        if (Object.keys(updateData).length === 0) {
            throw new AppError("No valid fields provided for update", 400);
        }

        const updatedUser = await prisma.users.update({
            where: { id },
            data: {
                name: { set: typeof updateData.name === "string" ? updateData.name : (typeof user.name === "string" ? user.name : "") },
                email: { set: typeof updateData.email === "string" ? updateData.email : (typeof user.email === "string" ? user.email : "") },
                phone: { set: typeof updateData.phoneNumber === "string" ? updateData.phoneNumber : (typeof user.phone === "string" ? user.phone : "") },
                updated_at: new Date(),
            },
        });

        const response: UserResponse = {
            id: updatedUser.id,
            name: updatedUser?.name ?? "",
            email: updatedUser?.email ?? "",
            phone: updatedUser?.phone ?? "",
            // role: updatedUser.role,
            createdAt: updatedUser.created_at,
            updatedAt: updatedUser.updated_at
        }
        return response;
    }
}