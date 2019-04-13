const Cars = require('../models/Cars');
const parseBody = require('../parse-body');

module.exports = (req, res) => {
  applyMethod(req)
    .then(res.send);
};

function applyMethod(req) {
  switch(req.method) {
    case 'GET':
      return req.id ? Cars.findById(req.id) : Cars.find();
    case 'POST':
      return parseBody(req)
        .then(car => Cars.create({
          brand: car.brand,
          model: car.model,
          year: car.year
        }));
    case 'PUT':
      return parseBody(req)
        .then(car => Cars.findByIdAndUpdate(req.id, {
          brand: car.brand,
          model: car.model,
          year: car.year
        }));
    case 'DELETE':
      return Cars.findByIdAndDelete(req.id);
  }
}
