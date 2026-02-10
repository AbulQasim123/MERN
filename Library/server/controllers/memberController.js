import Member from '../models/memberModel.js'
import { deleteImage } from '../utils/image-helper.js'
import { createMemberSchema, updateMemberSchema } from '../utils/member-validator.js'

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


export const createMember = async (req, res) => {
    const { error } = createMemberSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    if (!req.file) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: {
                profile: 'Profile image is required'
            }
        });
    }

    try {
        const { name, email, phone, address, status } = req.body;
        await Member.create({ name, email, phone, address, profile: req.file.filename, status });
        res.status(201).json({
            status: true,
            message: 'Member created successfully',
        });
    } catch (error) {
        console.error('Error creating member:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to create member'
        });
    }
}

export const getMember = async (req, res) => {
    try {

        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Member ID is required'
            });
        }

        const member = await Member.findById(id)

        if (!member) {
            return res.status(404).json({
                status: false,
                message: 'Member not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Member found',
            data: member
        });
    } catch (error) {
        console.error('Error getting member:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get member'
        });
    }
}

export const getMembers = async (req, res) => {
    try {

        let {
            page = 1,
            limit = 10,
            search = ''
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const query = {};

        if (search && search.trim() !== '') {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        const total = await Member.countDocuments(query);

        const members = await Member.find(query)
            .sort({ _id: -1 })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            status: true,
            message: 'Members found',
            data: members,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error getting members:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get members'
        });
    }
}

export const getActiveMembers = async (req, res) => {
    try {
        const members = await Member.find({ status: true }, { address: 0, profile: 0, email: 0, short_bio: 0, status: 0, createdAt: 0, updatedAt: 0, __v: 0 }).sort({ _id: -1 }).sort({ createdAt: -1 });
        if (!members.length) {
            return res.status(404).json({
                status: false,
                message: 'Members not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Members found',
            data: members
        });
    } catch (error) {
        console.error('Error getting members:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get members'
        });
    }
}

export const updateMember = async (req, res) => {

    const { error } = updateMemberSchema.validate(req.body, { abortEarly: false });

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
                message: 'Member ID is required'
            });
        }

        const member = await Member.findById(id);

        if (!member) {
            return res.status(404).json({
                status: false,
                message: 'Member not found'
            });
        }

        const { name, email, phone, address, status } = req.body;

        const updateData = {
            name,
            email,
            phone,
            address,
            status
        };

        if (req.file) {
            deleteImage(member.profile);

            updateData.profile = req.file.filename;
        }

        await Member.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )

        res.status(200).json({
            status: true,
            message: 'Member updated successfully',
        });

    } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to update member'
        });
    }
};

export const deleteMember = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Member ID is required',
            });
        }

        const deletedMember = await Member.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({
                status: false,
                message: 'Member not found',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Member deleted successfully',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};