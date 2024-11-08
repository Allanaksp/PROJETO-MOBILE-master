
const bookModel = require('../models/bookModel');

exports.createBook = async (req, res) => {
  try {
    const newBook = await bookModel.createBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar livro' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter livros' });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.getBookById(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livro' });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await bookModel.updateBook(id, req.body);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar livro' });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await bookModel.deleteBook(id);
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir livro' });
  }
};
