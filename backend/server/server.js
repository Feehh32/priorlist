/* eslint-disable no-undef */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// middlewares padrão (logger, cors, etc.)
server.use(middlewares);

// para permitir parsing de JSON no corpo da requisição
server.use(jsonServer.bodyParser);

// rota de login fake
server.post("/login", (req, res) => {
  const { email, password } = req.body;

  // pega os usuários do db.json
  const users = router.db.get("users").value();

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.status(200).json({
      message: "Login bem-sucedido",
      token: "fake-jwt-token",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401).json({ error: "Email ou senha inválidos" });
  }
});

// usa o roteador padrão do json-server
server.use(router);

// inicia o servidor
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server rodando em http://localhost:${PORT}`);
});
