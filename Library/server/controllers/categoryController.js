import Category from '../models/categoryModel.js'
import { createCategorySchema, updateCategorySchema } from '../utils/category-validator.js'

const formatValidationErrors = (joiError) => {
    const errors = {};
    joiError.details.forEach((err) => {
        const field = err.path[0];
        if (!errors[field]) {
            errors[field] = err.message;
        }
    });
    return errors;
}


export const createCategory = async (req, res) => {
    const { error } = createCategorySchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    try {
        const { name, description, status } = req.body;
        await Category.create({ name, description, status });
        res.status(201).json({
            status: true,
            message: 'Category created successfully',
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to create category'
        });
    }
}

export const getCategory = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Category ID is required'
            });
        }
        const category = await Category.findById(id, { createdAt: 0, updatedAt: 0, __v: 0 });
        if (!category) {
            return res.status(404).json({
                status: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Category found',
            data: category
        });
    } catch (error) {
        console.error('Error getting category:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get category'
        });
    }
}

export const getCategories = async (req, res) => {
    try {
        let {
            page = 1,
            limit = 10,
            search = ''
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const query = {
            name: { $regex: search, $options: 'i' }
        };

        const total = await Category.countDocuments(query);

        const categories = await Category.find(query, {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            status: true,
            message: 'Categories fetched',
            data: categories,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get categories'
        });
    }
}

export const getActiveCategories = async (req, res) => {
    try {
        const categories = await Category.find({ status: true }, { description: 0, status: 0, createdAt: 0, updatedAt: 0, __v: 0 }).sort({ _id: -1 });
        if (!categories.length) {
            return res.status(404).json({
                status: false,
                message: 'Categories not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Categories found',
            data: categories
        });
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get categories'
        });
    }
}

export const updateCategory = async (req, res) => {
    const { error } = updateCategorySchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Category ID is required'
            });
        }

        const { name, description, status } = req.body;
        await Category.findByIdAndUpdate(id, { name, description, status }, { new: true });

        res.status(200).json({
            status: true,
            message: 'Category updated successfully',
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to update category'
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Category ID is required'
            });
        }
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                status: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Category deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to delete category'
        });
    }
}
