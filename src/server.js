//importar as bibliotecas p o server
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const router = require("./routes/senaroutes");

//para carregar variaveis

dotenv.config({
  quiet: true,
  path: path.resolve(__dirname, "..", ".env"),
});

const PORT = process.env.PORT;

//construir o servidor
const app = express();
app.use(express.json());
app.listen(PORT, function(){
    console.log(`Rodando em http://localhost:${PORT}`);

});

//construir rota para index.html

const publicPath = path.join(__dirname,"..", "public");
const pagesPath = path.join(publicPath, "pages");
const assetsPath = path.join(publicPath, "assets");

//criar rota para index
app.get("/", express.static(pagesPath));
//criar rota p assets
app.use("/assets", express.static(assetsPath));

app.use("/senas", router);

