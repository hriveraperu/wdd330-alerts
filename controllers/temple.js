const db = require('../models');
const Temple = db.temples;

// const apiKey =
//   'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Temple
  const temple = new Temple({
    message: req.body.message,
    background: req.body.background,
    color: req.body.color,
  });
  // Save Temple in the database
  temple
    .save(temple)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Alert.',
      });
    });
};

exports.findAll = (req, res) => {
  // console.log(req.header('apiKey'));
  // if (req.header('apiKey') === apiKey) {
    Temple.find(
      {},
      {
        message: 1,
        background: 1,
        color: 1,
        _id: 0,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving temples.',
        });
      });
  // } else {
  //   res.send('Invalid apiKey, please read the documentation.');
  // }
};

// Find a single Temple with an id
exports.findOne = (req, res) => {
  const temple_id = req.params._id;
  // if (req.header('apiKey') === apiKey) {
    Temple.find({ temple_id: temple_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not found Alert with id ' + temple_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Alert with _id=' + temple_id,
        });
      });
  // } else {
  //   res.send('Invalid apiKey, please read the documentation.');
  // }
};

// Update a Temple by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Temple.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Alert with id=${id}. Maybe Alert was not found!`,
        });
      } else res.send({ message: 'Alert was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Alert with id=' + id,
      });
    });
};

// Delete a Temple with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params._id;

  Temple.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Alert with id=${id}. Maybe Alert was not found!`,
        });
      } else {
        res.send({
          message: 'Alert was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Alert with id=' + id,
      });
    });
};

// // Delete all Temples from the database.
// exports.deleteAll = (req, res) => {
//   Temple.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Temples were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all temple.',
//       });
//     });
// };

// // Find all published Temples
// exports.findAllPublished = (req, res) => {
//   Temple.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving temple.',
//       });
//     });
// };
