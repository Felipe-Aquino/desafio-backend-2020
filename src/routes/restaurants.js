const HTTP_CODES = require('../utils/http-status-code');

const { Op } = require("sequelize");
const { Restaurant } = require('../../models');

module.exports = function(app) {
  app.post('/restaurants', async (req, res) => {
    const restaurant = {
      email: req.body.email,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    };

    try {
      // Comparing texts whithout case-sensitiveness
      // Obs.: Could also be done by using postgres' citext type, but requires an extension.
      let [result, created] = await Restaurant.findOrCreate({
        where: {
          name: {
            [Op.iLike]: restaurant.name
          }
        },
        defaults: restaurant
      });

      if (created) {
        res.status(HTTP_CODES.OK).json(result.toJSON());
      } else {
        res.status(HTTP_CODES.BAD_REQUEST).json({
          error: 'Already exists a restaurant with the same name.'
        });
      }
    } catch (error) {
      res.status(HTTP_CODES.SERVER_ERROR).json({ error });
    }
  })

  app.get('/restaurants', async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll();
      res.status(HTTP_CODES.OK).json(restaurants.map(r => r.toJSON()));
    } catch (error) {
      res.status(HTTP_CODES.SERVER_ERROR).json({ error });
    }
  })

  app.put('/restaurants/:restaurant_id', async (req, res) => {
    const restaurant_id = Number(req.params.restaurant_id);

    const restaurant = {
      email: req.body.email,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    };

    if (isNaN(restaurant_id)) {
      res.status(HTTP_CODES.BAD_REQUEST).json({ error: 'id must be a number.' });
      return;
    }

    try {
      await Restaurant.update(
        restaurant,
        { where: { id: restaurant_id } }
      );

      res.status(HTTP_CODES.OK).json({});
    } catch (error) {
      res.status(HTTP_CODES.SERVER_ERROR).json({ error });
    }
  })

  app.delete('/restaurants/:restaurant_id', async (req, res) => {
    const restaurant_id = Number(req.params.restaurant_id);

    if (isNaN(restaurant_id)) {
      res.status(HTTP_CODES.BAD_REQUEST).json({ error: 'id must be a number.' });
      return;
    }

    try {
      await Restaurant.destroy({
        where: { id: restaurant_id }
      });

      res.status(HTTP_CODES.NO_CONTENT).json({});
    } catch (error) {
      res.status(HTTP_CODES.SERVER_ERROR).json({ error });
    }
  })
}
