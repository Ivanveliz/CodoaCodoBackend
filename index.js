const express = require('express')
const app = express()

app.use(express.static('public'))

app.use(express.json());

app.use('/productos', require("./routes/productos.router"))

// http://localhost:3000/
app.get('/', (req, res) => {
  res.send('hola express!!')
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})