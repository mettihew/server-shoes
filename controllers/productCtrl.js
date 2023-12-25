const Product = require('../models/productModel')

const get = async (req, res) => {
  const get = await Product.find()
  res.json(get)
}

const getCat = async (req, res) => {
  const {category} = req.params
  const limit = 4;
  let {page} = req.query
  const allCount = await Product.find({category}).countDocuments()
  const pn = Math.ceil(allCount / limit)
  const get = await Product.find({category}).skip((page - 1) * limit).limit(limit)
  res.json({products: get, pageNumberC: pn})
}


const getOne = async(req, res) => {
  const {id} = req.params
  const one = await Product.findById(id)
  res.json(one)
}

const create = async (req, res) => {
  const newB = await Product.create(req.body)
  res.send(newB)
}

const deleteOne = async (req, res) => {
  const del = await Product.findByIdAndDelete(req.body)
  res.json(del)
}


// NUMBER OF VIEW, LIKE, DISLIKE
// const getBlog = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validDateMongodbId(id);

//   try {
//     const getBlog = await Blog.findById(id)
//       .populate("likes")
//       .populate("dislikes");
//     const updateViews = await Blog.findByIdAndUpdate(
//       id,
//       {
//         $inc: { numViews: 1 },
//       },
//       { new: true }
//     );
//     res.json(getBlog);
//   } catch (error) {
//     throw new Error(error);
//   }
// });


const uploadImages = (async (req, res) => {
  const { id } = req.params;
  try {
    const uploader = (path) => colidanryUpdateImage(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const findblog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findblog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { create, getCat, uploadImages,deleteOne, get, getOne}