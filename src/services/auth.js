import Joi from "joi";
import HTTPException from "../util/HttpException.js";
import prisma from "../util/prisma.js";

class AuthService {

    
    login({username, password}) {
        return "Login Berhasil";
    }

    async register(username, password) {

        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        })

        console.log(existingUser)

        if (existingUser != null) {
            throw new HTTPException("Username sudah terdaftar", 400)
        }

        const newUser = await user.create({
            data: {
                username: username,
                password: password,
            },
        })

        return {
            status: "Sukses",
            data: newUser,
            message: "Berhasil Register"
        };

    }
}

export default new AuthService();