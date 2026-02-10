import Admin from '../models/adminModel.js'
import { hashPassword, comparePassword } from '../utils/hash-password.js'
import { registerSchema, loginSchema } from '../utils/auth-validator.js'
import { generateAccessToken } from '../utils/generate-token.js'

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


export const createAdmin = async (req, res) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    try {

        const { name, email, password } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                status: false,
                message: 'This email is already taken'
            });
        }

        const hashedPassword = await hashPassword(password);
        const admin = await Admin.create({ name, email, password: hashedPassword });
        res.status(201).json({
            status: true,
            message: 'Admin created successfully',
            data: {
                admin,
            }
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
}

export const loginAdmin = async (req, res) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    try {

        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({
                status: false,
                message: 'Invalid email'
            });
        }

        const isPasswordValid = await comparePassword(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                status: false,
                message: 'Invalid password'
            });
        }

        const token = generateAccessToken(admin);
        res.status(200).json({
            status: true,
            message: 'Admin logged in successfully',
            data: {
                admin,
                token
            }
        });
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
}


export const getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user._id, { password: 0 });
        if (!admin) {
            return res.status(400).json({
                status: false,
                message: 'Admin not found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Admin profile retrieved successfully',
            data: admin
        });

    } catch (error) {
        console.error('Error getting admin profile:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user._id);
        if (!admin) {
            return res.status(400).json({
                status: false,
                message: 'Data not found'
            });
        }

        const { name, email, password } = req.body;
        const updates = { name, email };
        if (password) {
            const hashedPassword = await hashPassword(password);
            updates.password = hashedPassword;
        }
        const updated = await Admin.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');

        res.status(200).json({
            status: true,
            message: 'Admin profile updated successfully',
            data: updated
        });
    } catch (error) {
        console.error('Error updating admin profile:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
}

export const logoutAdmin = async (req, res) => {
    try {
        res.status(200).json({
            status: true,
            message: 'Admin logged out successfully'
        });
    } catch (error) {
        console.error('Error logging out admin:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
}