import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    password: {
      type: String
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "modified", deletedAt: "deleted" },
  }
);

const User = mongoose.model("User", UserSchema);
export default mongoose.models.User || User;
