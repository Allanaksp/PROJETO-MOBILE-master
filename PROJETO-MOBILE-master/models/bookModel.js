
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

// Definindo o esquema de validação com Zod
const bookSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(255),
  author: z.string().min(1, "Autor é obrigatório").max(255),
  genre: z.string().min(1, "Gênero é obrigatório").max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['Lido', 'A ler']),
});

async function createBook(data) {
  const validatedData = bookSchema.parse(data);
  return await prisma.book.create({
    data: validatedData,
  });
}

async function getAllBooks() {
  return await prisma.book.findMany();
}

async function getBookById(id) {
  return await prisma.book.findUnique({
    where: { id: Number(id) },
  });
}

async function updateBook(id, data) {
  const validatedData = bookSchema.parse(data);
  return await prisma.book.update({
    where: { id: Number(id) },
    data: validatedData,
  });
}

async function deleteBook(id) {
  return await prisma.book.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
