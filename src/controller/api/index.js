import { getHello } from "../../services/home.js"



/**
 * Fungsi untuk membuat route pada server Hapi.
 * @param {(data: ServerRoute | ServerRoute[]) => void} route 
 * @returns {void}
 */
function home(route) {

    route({
        method: "GET",
        path: "/",
        handler: (request, h) => {
            return getHello()        
        },
        options : {
            description: "Halaman Utama",
            notes: "Ini adalah halaman utama dari API kami. Anda dapat mengakses endpoint lain untuk mendapatkan informasi lebih lanjut.",
            tags: ["api", "home"],
        }
    })

}

export default home