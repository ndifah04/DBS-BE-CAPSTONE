/**
 * Fungsi untuk membuat route pada server Hapi.
 * @param {(data: import("@hapi/hapi").ServerRoute | import("@hapi/hapi").ServerRoute[]) => void} route
 */
function main(route) {
  route({
    method: "GET",
    path: "",
    handler: (request, h) => {
        return "Selamat Datang Di API Kami";
      },
    options: {
      description: "Halaman Utama",
      notes:
        "Ini adalah halaman utama dari API kami. Anda dapat mengakses endpoint lain untuk mendapatkan informasi lebih lanjut.",
      tags: ["api", "home"],
      
      
    },
  });
}

export default main;
