const { z } = require('zod');

const bookSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(255),
  author: z.string().min(1, "Autor é obrigatório").max(255),
  genre: z.string().min(1, "Gênero é obrigatório").max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['Lido', 'A ler']),
  coverImage: z.string().url().optional(),
});

module.exports = bookSchema;
