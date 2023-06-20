import { Irrf, NewIrrf } from "@/types/IrrfItem";
import prisma from "./prisma";

const Api = {
    async getUserFromEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    },
    async getIrrfTable() {
        return await prisma.irrfTable.findMany({
            select: {
                id: true,
                deduction: true,
                final_limit: true,
                initial_limit: true,
                percentage: true,
            },
        });
    },
    async addIrrfTable(data: NewIrrf, userId: number) {
        return await prisma.irrfTable.create({
            data: { ...data, user_id: userId },
            select: {
                deduction: true,
                final_limit: true,
                id: true,
                initial_limit: true,
                percentage: true,
            },
        });
    },
    async deleteIrrfTable(id: number) {
        return await prisma.irrfTable.delete({
            where: {
                id,
            },
        });
    },
    async updateIrrfTable(id: number, data: Irrf) {
        return await prisma.irrfTable.update({
            where: {
                id,
            },
            data,
            select: {
                deduction: true,
                final_limit: true,
                id: true,
                initial_limit: true,
                percentage: true,
            },
        });
    },
};

export default Api;
