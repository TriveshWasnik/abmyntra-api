import { Product } from "../../models/product.model.js";

// get Products by category
export const listProductByCategory = async function (req, res) {
  try {
    const {
      page,
      maxPrice,
      minPrice,
      order,
      orderBy,
      brand,
      size,
      color,
      weight,
    } = req.query;

    const categoryId = req.params.id;
    const itemsPerPage = 12;
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * itemsPerPage;
    let sortOptions = {};

    if (orderBy) {
      if (orderBy == "trendingProduct") {
        sortOptions[orderBy] = 1;
      }
      if (orderBy == "newArriveProduct") {
        sortOptions[orderBy] = 1;
      }
      if (orderBy == "sellingPrice") {
        sortOptions[orderBy] = order === "ASE" ? 1 : -1;
      }
    } else {
      sortOptions["sellingPrice"] = 1;
    }

    // build the base query for finding products by category
    const baseQuery = {
      $or: [{ parentCategory: categoryId }, { childCategory: categoryId }],
    };

    // Add the price filtering to the base query
    if (minPrice || maxPrice) {
      baseQuery.sellingPrice = {};
      if (minPrice) baseQuery.sellingPrice.$gte = parseInt(minPrice);
      if (maxPrice) baseQuery.sellingPrice.$lte = parseInt(maxPrice);
    }

    if (weight) {
      const [weightnum, weighttype] = weight.split(" ");
      baseQuery.weight = weightnum;
      baseQuery.weightType = weighttype;
    }

    if (color) baseQuery.color = color;
    if (size) baseQuery.size = size;
    if (brand) baseQuery.brand = brand;

    // get total count before applying filter
    const totalCountBeforeFilter = await Product.countDocuments(baseQuery);

    // Get products before applying filters
    const productsBeforeFilter = await Product.find(baseQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(itemsPerPage);

    const totalItems = totalCountBeforeFilter;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return res.status(200).json({
      data: productsBeforeFilter,
      totalPages,
      itemsPerPage,
      totalItems,
      pageNumber,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in get Products APi", success: false });
  }
};
