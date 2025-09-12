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
      token: "fake-jwt-token",
      id: user.id,
    });
  } else {
    res.status(401).json({ error: "Email ou senha inválidos" });
  }
});

server.get("/me", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];
  if (token !== "fake-jwt-token") {
    return res.status(403).json({ error: "Token inválido" });
  }

  const userId = req.query.id;
  if (!userId) {
    return res.status(400).json({ error: "Id do usuário não fornecido" });
  }

  const user = router.db.get("users").find({ id: userId }).value();
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  // eslint-disable-next-line no-unused-vars
  const { password, ...userData } = user;
  res.status(200).json(userData);
});

// usa o roteador padrão do json-server
server.use(router);

// inicia o servidor
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server rodando em http://localhost:${PORT}`);
});
