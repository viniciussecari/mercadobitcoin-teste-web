const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.post("/registration", function (req, res) {
  const body = req.body;

  let errorMsg = "Campos Faltantes: ";
  let fieldsErros = [];
  let countErrors = 0;

  if (body.email == "") {
    fieldsErros.push("e-mail");
    countErrors++;
  }
  if (body.type == "") {
    fieldsErros.push("tipo de pessoa");
    countErrors++;
  }
  if (body.name == "") {
    fieldsErros.push("nome");
    countErrors++;
  }
  if (body.doc == "") {
    fieldsErros.push("documento");
    countErrors++;
  }
  if (body.date == "") {
    fieldsErros.push("data");
    countErrors++;
  }
  if (body.phone == "") {
    fieldsErros.push("telefone");
    countErrors++;
  }
  if (body.password == "") {
    fieldsErros.push("senha");
    countErrors++;
  }

  errorMsg += fieldsErros.join(", ");

  if (countErrors == 0) {
    res.status(200).json({ message: "OK!" });
  } else {
    res.status(400).json({ message: errorMsg });
  }
});

app.listen(8081);
