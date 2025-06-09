
import HTTPException from './HttpException.js'

/**
 * @param {ServerRoute} route
 * @param {HapiServer} server
 * @param {string} path
 */
const setupRoute = (server, route, path) => {
    let parsePath = (route.path.at(0) == "/" || path == "/" ? "" : "/") + route.path.replace(/\/$/g, "")

    console.log(parsePath)

    

    server.route({
        ...route,
        path: path + parsePath,
        handler: async (request, h) => {
            if (route.handler) {
                try {
                    return await route.handler(request, h)
                } catch (err) {
                    console.log(err)
                    if (err instanceof HTTPException) {
                        return h.response({ message: err.message, status: "Error" }).code(err.statusCode)
                    }
                    return h.response({ message: "Internal Server Error", status: "Error" }).code(500)
                }
            }
            return h.response({ message: "Route tidak ditemukan" }).code(404)
        },
        options: {
            ...route.options,
            validate: {
                ...route.options?.validate,
                failAction: route.options?.failAction != null ? route.options?.failAction :  (request, h, err) => {
                    return h.response({ message: err.message, status: "Error" }).code(400).takeover()
                }
            }
        }
    })
}

/**
 * Fungsi untuk membuat route pada server Hapi.
 * @param {HapiServer} server 
 * @param {string} path 
 * @returns {(data: ServerRoute | ServerRoute[]) => void}
*/
const makeRoutes = (server, path) => {

    return (routes) => {
        if (Array.isArray(routes)) {
            routes.forEach(route => {
                setupRoute(server, route, path)
            })
            return
        }

        setupRoute(server, routes, path)
    }

}


export default makeRoutes