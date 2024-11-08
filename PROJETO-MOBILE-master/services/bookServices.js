const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBook = async (bookData) => {
  try {
    const newBook = await prisma.book.create({
      data: bookData
    });
    return newBook;
  } catch (error) {
    throw new Error('Erro ao criar o livro.');
  }
};

exports.getBooks = async () => {
  try {
    return await prisma.book.findMany();
  } catch (error) {
    throw new Error('Erro ao obter os livros.');
  }
};

exports.getBookById = async (id) => {
  try {
    return await prisma.book.findUnique({
      where: { id: parseInt(id) }
    });
  } catch (error) {
    throw new Error('Erro ao obter o livro.');
  }
};

exports.updateBook = async (id, bookData) => {
  try {
    return await prisma.book.update({
      where: { id: parseInt(id) },
      data: bookData
    });
  } catch (error) {
    throw new Error('Erro ao atualizar o livro.');
  }
};

exports.deleteBook = async (id) => {
  try {
    return await prisma.book.delete({
      where: { id: parseInt(id) }
    });
  } catch (error) {
    throw new Error('Erro ao excluir o livro.');
  }
};


exports.getBooks = async () => {
  return await prisma.book.findMany();
};
