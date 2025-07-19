import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const createUser = async (data: {
  name: string;
  contact: string;
  passwordHash: string;
  userType?: "student" | "staff";
  studentId?: string;
}) => {
  const user = await prisma.user.create({ data });
  revalidatePath("/"); // Adjust as per your route
  return user;
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { stoveUsages: true },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: { stoveUsages: true },
    cacheStrategy: {
    ttl: 30,
    swr: 60
  }
  },
);
};

export const updateUser = async (
  id: string,
  data: {
    name?: string;
    contact?: string;
    passwordHash?: string;
    userType?: "student" | "staff";
    studentId?: string;
  }
) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  revalidatePath("/users"); // Or `/users/${id}` if detail page
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  revalidatePath("/users");
  return user;
};

//
// ===========================
// STOVE USAGE ACTIONS
// ===========================
//

export const createStoveUsage = async (data: {
  userId: string;
  stoveType: string;
  fuelType: string;
  dailyFuelUse: number;
  dailyHours: number;
  efficiency: number;
  householdSize: number;
  emissionTotal: number;
}) => {
  const usage = await prisma.stoveUsage.create({ data });
  revalidatePath("/stove-usages");
  return usage;
};

export const getStoveUsageById = async (id: string) => {
  return await prisma.stoveUsage.findUnique({
    where: { id },
    include: { user: true },
  });
};

export const getAllStoveUsages = async () => {
  return await prisma.stoveUsage.findMany({
    include: { user: true },
  });
};

export const getStoveUsagesByUserId = async (userId: string) => {
  return await prisma.stoveUsage.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const updateStoveUsage = async (
  id: string,
  data: {
    stoveType?: string;
    fuelType?: string;
    dailyFuelUse?: number;
    dailyHours?: number;
    efficiency?: number;
    householdSize?: number;
    emissionTotal?: number;
  }
) => {
  const usage = await prisma.stoveUsage.update({
    where: { id },
    data,
  });
  revalidatePath("/stove-usages");
  return usage;
};

export const deleteStoveUsage = async (id: string) => {
  const usage = await prisma.stoveUsage.delete({
    where: { id },
  });
  revalidatePath("/stove-usages");
  return usage;
};
