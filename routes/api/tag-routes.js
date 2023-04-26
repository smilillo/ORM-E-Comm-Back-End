const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    })
    .then((tags) => res.json(tags))
    .catch ((err) => res.status(500).json(err))
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product, through: ProductTag }]
    })

    // if (!tagData) {
    //   res.status(404).json({ message: 'No tag found with this id!' });
    //   return;
    // }

    .then((tags) => res.json(tags))
    .catch ((err) => res.status(500).json(err))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tags) => res.json(tags))
    .catch ((err) => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
      where: { 
        id: req.params.id 
      }
    })
    .then((tags) => res.json(tags))
    .catch ((err) => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    // if (!tagData) {
    //   res.status(404).json({ message: 'No tag found with this id!' });
    //   return;
    // }

    .then((tags) => res.json(tags))
    .catch ((err) => res.status(500).json(err))
});

module.exports = router;
