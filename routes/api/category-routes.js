const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
      include: [ Product ]
    })
    .then((category) => res.json(category))
    .catch ((err) => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  Category.findOne({
      where: { id: req.params.id },
      include: [ Product ]
    })
    // if (!categoryData) {
    //   res.status(404).json({ message: 'No category found with this id!' });
    //   return;
    // }
    .then((category) => res.json(category))
    .catch ((err) => res.status(500).json(err))
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((category) => res.json(category))
  .catch ((err) => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
      where: {
        id: req.params.id
      }
    })
    .then((category) => res.json(category))
    .catch ((err) => res.status(500).json(err))
});

router.delete('/:id', async (req, res) => {
  Category.destroy({
      where: {
        id: req.params.id
      }
    })

    // if (!categoryData) {
    //   res.status(404).json({ message: 'No category found with this id!' });
    //   return;
    // }

    .then((category) => res.json(category))
    .catch ((err) => res.status(500).json(err))
});

module.exports = router;
