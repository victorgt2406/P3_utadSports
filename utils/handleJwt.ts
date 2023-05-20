import { error } from "console";
import jwt from "jsonwebtoken";

const tokenSign = async (user: any, hoursExp: number = 2) => {
  const token = jwt.sign(
    {
      _id: user._id,
      // [propertiesKey.id]: user[propertiesKey.id], // [] propiedad dinámica
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: `${hoursExp}h`,
    }
  );

  return { token, hoursExp };
};

const verifyToken = async (tokenJwt: string) => {
  try {
    return jwt.verify(tokenJwt, process.env.JWT_SECRET!);
  } catch (err) {
    // console.log("token verify error", err);
    throw error("token verify error", err);
  }
};

export { tokenSign, verifyToken };
