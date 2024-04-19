import mongoose from "mongoose";

const RolSchema = mongoose.Schema ({
    name: {
        type: String,
    },
});

export const RolModel = mongoose.model('Rol', RolSchema);