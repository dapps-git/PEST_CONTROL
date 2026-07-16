import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import { AdminModel } from "../model/admin.model";

export class AuthService {
  async login(email: string, password: string) {
    const admin = await AdminModel.findOne({ email: email.toLowerCase() });

    if (!admin) {
      throw new AppError({
        message: "Invalid email or password.",
        statusCode: 401,
      });
    }

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) {
      throw new AppError({
        message: "Invalid email or password.",
        statusCode: 401,
      });
    }

    return { email: admin.email };
  }
}
