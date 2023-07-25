const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Middleware para converter o corpo da requisição para JSON
app.use(bodyParser.json());


// Rota para receber a string e armazenar no documento de texto
app.post('/api/log', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'A string não foi fornecida.' });
  }

  // Adiciona a string no documento de texto com quebra de linha
  // caso queira alterar onde a string será salva, basta alterar o log.txt abaixo 
  // que se encontra na raiz do projeto atualmente
  fs.appendFile('log.txt', text + '\n', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao armazenar a string.' });
    }
    res.status(200).json({ message: 'String armazenada com sucesso.' });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
