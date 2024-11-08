// server.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Rota para listar todos os livros
app.get('/api/books', async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// Rota para adicionar um novo livro
app.post('/api/books', async (req, res) => {
  
  
    const { title, author } = req.body;
      try {

      const book = await prisma.book.findUnique({
        where: { id: parseInt(id) },
      });
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching book' });
    }
});

//adicionar um novo livro no banco de dados
const newBook = await prisma.book.create({
    data: { title, author } // "data" deve ser usado para enviar os dados
    });
    res.status(201).json(newBook);  // Retorna o livro recém-criado
res.catch (error) 

    console.error(error);  // Opcional: loga o erro no console para facilitar o debug
res.status(500).json({ error: 'Error adding book'  });



// Rota para editar um livro existente
app.put('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    try {
      // Atualizar o livro com o ID fornecido
      const updatedBook = await prisma.book.update({
        where: { id: parseInt(id) },
        data: { title, author },
      });
      res.json(updatedBook);  // Retorna o livro atualizado
    } catch (error) {
      res.status(500).json({ error: 'Error updating book' });
    }
  });

// Update a book
app.put('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  try {
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author },
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Error updating book' });
  }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
