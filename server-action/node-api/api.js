const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8000;
const secretKey = 'suaChaveSecreta'; // Mantenha isso seguro em um ambiente de produção

// Simulação de banco de dados de usuários (substitua isso com seu próprio mecanismo de autenticação)
const users = [
  { id: 1, username: 'admin', password: '123' },
  { id: 2, username: 'admin', password: '123' },
];

// Middleware para processar dados JSON
app.use(bodyParser.json());

// Rota para autenticar um usuário e gerar um token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
    console.log('teer')
  // Verifica se o usuário existe na simulação do banco de dados
  const user = users.find((u) => u.username === username && u.password === password);
  console.log(username, 'res')

  if (user) {
    // Cria um token JWT com informações do usuário
    const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    // Retorna o token para o cliente
    res.json({ token });
  } else {
    // Retorna um erro se a autenticação falhar
    res.status(401).json({ error: 'Autenticação falhou. Verifique o nome de usuário e senha.' });
  }
});

// Middleware para verificar o token em rotas protegidas
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Token ausente. Autenticação necessária.' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido.' });

    req.user = user;
    next();
  });
}

// Rota protegida para obter dados do usuário
app.get('/profile', authenticateToken, (req, res) => {
  // req.user contém as informações do usuário extraídas do token
  res.json({ userId: req.user.userId, username: req.user.username });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
