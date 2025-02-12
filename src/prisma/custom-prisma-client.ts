import { Prisma, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { generateSlug } from 'src/utils/slug';

export function softDeleteExtension(prisma: PrismaClient) {

  const modelsWithSoftDelete = ['Users', 'Products'];

  return prisma.$extends({
    model: {
      $allModels: {
        async softDelete<T>(this: T, where: Prisma.Args<T, 'update'>['where']) {
          const modelName = (this as any)._modelMeta.name;
          if (!modelsWithSoftDelete.includes(modelName)) {
            throw new Error(`Model ${modelName} not support soft remove`);
          }
          return (this as any).update({
            where,
            data: { deletedAt: new Date() },
          });
        },
      },
    },
    query: {
      $allModels: {
        async findMany({ model, args, query }) {
          if (modelsWithSoftDelete.includes(model)) {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        },
        async findFirst({ model, args, query }) {
          if (modelsWithSoftDelete.includes(model)) {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        },
      },
      users: {
        async create({ args, query }) {
          if (args.data.password) {
            args.data.password = await hash(args.data.password, 10);
          }
          return query(args);
        },
      },
      products: {
        async create({ args, query }) {
          if (args.data.title) {
            args.data.slug = generateSlug(args.data.title)
          }
          return query(args);
        },
      },
    },
  });
}
