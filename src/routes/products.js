const HTTP_CODES = require('../utils/http-status-code');

const { Product } = require('../../models');

module.exports = function(app) {
  app.post('/products', async (req, res) => {
    const product = {
      restaurant_id: req.body.restaurant_id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      complements: req.body.complements
    };

    try {
      let result = await Product.create(product);

      res.status(HTTP_CODES.OK).json(result.toJSON());
    } catch (error) {
      res.status(HTTP_CODES.SERVER_ERROR).json({ error });
    }
  })

  app.get('/products', async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(HTTP_CODES.OK).json(products.map(r => r.toJSON()));
    } catch (error) {
      res.status(HTTP_CODES.SERVER_ERROR).json({ error });
    }
  })

  app.put('/products/:product_id', async (req, res) => {
    const product_id = Number(req.params.product_id);

    const product = {
      restaurant_id: req.body.restaurant_id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      complements: req.body.complements
    };

    if (isNaN(product_id)) {
      res.status(HTTP_CODES.BAD_REQUEST).json({ error: 'id must be a number.' });
      return;
    }

    try {
      // TODO: Verificar constraint do id do restaurante
      await Product.update(
        product,
        { where: { id: product_id } }
      );

      res.status(HTTP_CODES.OK).json({});
    } catch (error) {
      res.status(HTTP_CODES.SERVER_ERROR).json({ error });
    }
  })

  app.delete('/products/:product_id', async (req, res) => {
    const product_id = Number(req.params.product_id);

    if (isNaN(product_id)) {
      res.status(HTTP_CODES.BAD_REQUEST).json({ error: 'id must be a number.' });
      return;
    }

    try {
      await Product.destroy({
        where: { id: product_id }
      });

      res.status(HTTP_CODES.NO_CONTENT).json({});
    } catch (error) {
      res.status(HTTP_CODES.SERVER_ERROR).json({ error });
    }
  })

  app.get('/menu/:restaurant_id', async (req, res) => {
    const restaurant_id = Number(req.params.restaurant_id);

    if (isNaN(restaurant_id)) {
      res.status(HTTP_CODES.BAD_REQUEST).json({ error: 'id must be a number.' });
      return;
    }

    try {
      const products = await Product.findAll({
        where: { restaurant_id }
      });

      res.status(HTTP_CODES.OK).json(products.map(r => r.toJSON()));
    } catch (error) {
      res.status(HTTP_CODES.SERVER_ERROR).json({ error });
    }
  })
}
