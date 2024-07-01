require("dotenv").config();

const express = require('express')
const app = express()
const cors = require('cors');

app.use(express.static('public'))

app.use(express.json());

app.use(cors());

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'https://emus181.alwaysdata.net/',
  credentials: true // Reemplaza esto con la URL de tu frontend
}));

app.use('/productos', require("./routes/productos.router"))
app.use("/auth", require("./routes/auth.router"));

// http://localhost:3000/
app.get('/', (req, res) => {
  res.send('hola express!!')
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})