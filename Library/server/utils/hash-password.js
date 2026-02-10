import bcrypt from "bcrypt";

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.log(error.message);
    }
}

const comparePassword = async (password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (error) {
        console.log(error.message);
    }
}

export { hashPassword, comparePassword };