'use server';

import { Templates } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { currentUser } from '@/features/auth/actions';

import { db } from '@/lib/db';

export const createPlayground = async (data: {
  title: string;
  template: Templates;
  description?: string;
  userId: string;
}) => {
  const { title, description, template } = data;

  const user = await currentUser();

  try {
    const playground = await db.playground.create({
      data: {
        title,
        description,
        template,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        userId: user?.id!,
      },
    });

    return playground;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllPlaygroundsForUser = async () => {
  const user = await currentUser();

  try {
    const playground = await db.playground.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
        starMark: {
          where: {
            userId: user?.id,
          },
          select: {
            isMarked: true,
          },
        },
      },
    });

    return playground;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    await db.playground.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard');
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editProjectById = async (
  id: string,
  data: { title: string; description: string }
) => {
  try {
    await db.playground.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const duplicateProjectById = async (id: string) => {
  try {
    const originalProject = await db.playground.findUnique({
      where: {
        id,
      },
    });

    if (!originalProject) {
      throw new Error('Playground not found');
    }

    const duplicatePlayground = await db.playground.create({
      data: {
        title: `${originalProject.title} (Copy)`,
        description: originalProject.description,
        template: originalProject.template,
        userId: originalProject.userId,
      },
    });

    revalidatePath('/dashboard');
    return duplicatePlayground;
  } catch (error) {
    console.error(error);
    return null;
  }
};
