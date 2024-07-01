const db = require("../db/db")

const fs = require("fs")
const path = require("path")

const index = (req, res) => {
  const sql = "SELECT * FROM catalogo";
  db.query(sql, (error, rows) => {
    if (error){
      return res.status(500).json({error: 'intente mas tarde'})
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const {id} = req.params;

  const sql = "SELECT * FROM catalogo WHERE Id = ?";
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error){
      return res.status(500).json({error: 'intente mas tarde'})
    }

    if(rows.length == 0) {
      return res.status(404).send({error: 'No existe el producto'})
    }

    res.json(rows[0]);
  });
}

const store = (req, res) => {
  console.log(req.file);

  let imageName = "";
  
  if(req.file) {
    imageName = req.file.filename
  }
  const {CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria} = req.body;

  const sql = "INSERT INTO catalogo (CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria, imageName], (error, result) => {
    // console.log(result);
    if (error){
      // console.log(error);
      return res.status(500).json({error: 'intente mas tarde'});
    }

    const producto = {...req.body, id: result.insertId}

    res.status(201).json(producto);
  });
}

const update = (req, res) => {
  const {id} = req.params;
  const {CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria} = req.body;

  const sql = "UPDATE catalogo SET CodigoArticulo = ?, Descripcion = ?, Medida = ?, Color = ?, Madera = ?, Categoria = ? WHERE Id = ?"
  db.query(sql, [CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria, id], (error, result) => {
    console.log(error);
    if (error){
      return res.status(500).json({error: 'intente mas tarde'})
    }
    if(result.affectedRows == 0) {
      return res.status(404).send({error: 'No existe el producto'})
    }

    const producto = {...req.body, ...res.params}

    res.json(producto);
  });
}

const destroy = (req, res) => {
  const {id} = req.params;

    let sql = "SELECT * FROM catalogo WHERE Id = ?";
    db.query(sql, [id], (error, rows) => {
      // console.log(rows);
      if (error){
        return res.status(500).json({error: 'intente mas tarde'})
      }
  
      if(rows.length == 0) {
        return res.status(404).send({error: 'No existe el producto'})
      }
  
      fs.unlinkSync(path.resolve(__dirname, "../public/uploads", rows[0].Imagen));

    });

    sql = "DELETE FROM catalogo WHERE Id = ?";
    db.query(sql, [id], (error, result) => {
    // console.log(result);
    if (error){
      return res.status(500).json({error: 'intente mas tarde'})
    }

    if(result.affectedRows == 0) {
      return res.status(404).send({error: 'No existe el producto'})
    }

    res.json({mensaje: 'Producto eliminado'});
  });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};