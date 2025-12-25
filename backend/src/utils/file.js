import fs from "fs";
import path from "path";

export const deleteFile = (fileUrl) => {
  if (!fileUrl) return;

  try {
    const fullPath = path.join(process.cwd(), fileUrl);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log("Deleted:", fullPath);
    } else {
      console.warn("File not found:", fullPath);
    }
  } catch (err) {
    console.error("File delete error:", err.message);
    // ❗ DO NOT throw
  }
};
