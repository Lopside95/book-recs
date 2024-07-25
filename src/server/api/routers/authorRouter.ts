import { booksSchema } from "@/types/books";
import { createRouter, publicProcedure } from "../trpc";
import { prisma } from "@/server/db";

export const authorRouter = createRouter({
  getAuthors: publicProcedure.query(async () => {
    const authors = prisma.author.findMany();

    return authors;
  }),
  // booksByAuthor: publicProcedure.input(booksSchema).query(async ({ input }) => {
  //   const authorId = await prisma.author.findUnique({
  //     where: {
  //       id: input.author,
  //     },
  //   });

  //   const books = await prisma.book.findMany({
  //     where: {
  //       authorId: input.author,
  //     },
  //   });

  //   return books;
  // }),
  booksByAuthor: publicProcedure.input(booksSchema).query(async ({ input }) => {
    const author = await prisma.author.findFirst({
      where: {
        name: input.author,
      },
    });

    if (!author) {
      console.log("cant find author");
    }

    const biblio = await prisma.book.findMany({
      where: {
        authorId: author?.id,
      },
      include: {
        author: true,
      },
    });

    return biblio;
  }),
});
// createAuthor: publicProcedure
//   .input(booksSchema)
//   .mutation(async ({ input }) => {
//     try {
//       await prisma.author.createMany({
//         data: {
//           name: input.author,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }),
