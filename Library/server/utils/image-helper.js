import fs from "fs";
import path from "path";

export const deleteImage = (filename) => {
    if (!filename) return;

    const filePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        filename
    );

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};
