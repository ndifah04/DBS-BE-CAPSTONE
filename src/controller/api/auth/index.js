import Joi from "joi"
import { login } from "../../../services/home.js"


/**
 * Fungsi untuk membuat route pada server Hapi.
 * @param {(data: ServerRoute | ServerRoute[]) => void} route 
 * @returns {void}
 */
function auth(route) {

    route({
        method: "POST",
        path: "/login",
        handler: (request, h) => {
            
            const { username, password } = request.payload
            return login(username, password)
        },
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().regex(/^[a-zA-Z0-9]+$/).required().messages({
                        "string.pattern.base": "Username harus berupa angka"
                    }).example("Fachri"),
                    password: Joi.string().required().example("password")
                })
            },
            description: "Login User",
            notes: "Endpoint ini digunakan untuk login user. Pastikan username dan password sudah benar.",
            tags: ["api", "auth"],
            
        }
    })

    route({
        method: "POST",
        path: "/register",
        handler: (request, h) => {
            
            const { username, password } = request.payload

            return register(username, password)
            
        },
        options : {
            description: "Register User",
            notes: "Endpoint ini digunakan untuk mendaftar user baru. Pastikan username belum terdaftar sebelumnya.",
            tags: ["api", "auth"],
        }
        
        
    })

}

export default auth