import * as fs from "fs"
import * as path from "path";
import makeRoutes from "./makeRoutes.js";
import server from "./server.js";

/**
 * Membaca isi file js dari dalam folder controller
 * @param {string} dir 
 * @returns {string}
 */
function recursiveFiles(dir = "") {
    // Fungsi ini membaca semua file dan folder dalam direktori secara rekursif.
    // Jika menemukan folder, fungsi akan memanggil dirinya sendiri untuk membaca isi folder tersebut.
    // Hasil akhirnya adalah array berisi path relatif dari semua file (kecuali "index.js" di paling awal).

    
    const files = fs.readdirSync(path.join(__dirname, "../controller", dir), { withFileTypes: true });
    let result = [];

    files.forEach(file => {
        const fullPath = path.join(dir, file.name); // Menggunakan path relatif
        if (file.isDirectory()) {
            // Jika file adalah folder, panggil fungsi ini secara rekursif.
            result = result.concat(recursiveFiles(fullPath));
        } else {
            // Jika file adalah file biasa, tambahkan ke hasil.
            result.push(fullPath);
        }
    });

    return result;
}

// Dinamis Routes. Tidak perlu repot-repot import manual masing-masing controller.
/**
 * 
 * @param {HapiServer} server  
 */
function setupRoute(server) {
    // Fungsi ini bertugas untuk mengatur route secara dinamis.
    // Semua file controller akan di-load secara otomatis.

    const files = recursiveFiles() // Mendapatkan semua file controller

    files.forEach(file => {
        const routePath = `/${file
        .replace(/\\/g, '/') 
        .replace(/\/?index\.js$/, '') 
        .replace(/\/$/, '') 
        .replace(/\.js$/, '')}`; 
        
        try {
            const {default : controller} = require(`../controller/${file}`)
            
            if (typeof controller === 'function') {
                const makeLocalRoutes = makeRoutes(server, routePath )
                controller(makeLocalRoutes);
            }

        } catch (err) {
            console.error("Error on path "+routePath+" : "+err)
        }
    })
}
export default setupRoute