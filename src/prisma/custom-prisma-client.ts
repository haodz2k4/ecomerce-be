import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { generateSlug } from 'src/utils/slug';
import { ordersInclude } from './include/orders-include';

export function softDeleteExtension(prisma: PrismaClient) {

  const modelsWithSoftDelete = ['Users', 'Products','Categories', 'Roles', 'Inventories'];

  return prisma.$extends({
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
        async findFirstOrThrow({ model, args, query }) {
          if (modelsWithSoftDelete.includes(model)) {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        },
        async findUnique({model, args, query}) {
          if (modelsWithSoftDelete.includes(model)) {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        },
        async findUniqueOrThrow({ model, args, query }) {
          if (modelsWithSoftDelete.includes(model)) {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        },
        async delete({ model, args, query }) {
          if (modelsWithSoftDelete.includes(model)) {
            return prisma[model].update({
              where: args.where,
              data: { deletedAt: new Date() },
            });
          }
          return query(args); 
        },
        async count({ model, args, query }) {
          if (modelsWithSoftDelete.includes(model)) {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        }
        
        
        
        
        
        
      },
      users: {
        async findMany({args, query}) {
          return query(args)
        },
        async create({ args, query }) {
          args.data.password = await hash(args.data.password, 10);
          
          return query(args);
        },
        async update({args, query}) {
          if(args.data.password) {
            args.data.password = await hash(args.data.password, 10);
          }
          return query(args)
        },
      },
      products: {
        async update({args, query}) {
          const title = args.data.title as string;
          if (title) {
            args.data.slug = generateSlug(title)
          }

          return query(args)
        },
        async findMany({args, query}) {
          args.include = {
            inventories: true,
            images: {
              select: {
                url: true 
              }
            } 
          }
          return query(args)
        }
        
      },
      categories: {
        async update({args, query}) {
          const title = args.data.title as string;
          if(title) {
            args.data.slug = generateSlug(title);
          }
          return query(args)
        }
      },
      orders: {
        async findMany({args, query}) {
          args.include = ordersInclude
          return query(args);
        },
        async findUnique({args, query}) {
          args.include = ordersInclude
          return query(args);
        }
      }
    },
  });
}
