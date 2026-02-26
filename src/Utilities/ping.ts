import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

export class PingController {
    private static prisma = new PrismaClient();

    static async getUser(_req: Request, res: Response, next: NextFunction) {
        try {
            const id = process.env.USER_ID;
            const user = await PingController.prisma.users.findUnique({ where: { id } });

            if (!user) return res.status(404).json({ message: 'User not found' });
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }
}