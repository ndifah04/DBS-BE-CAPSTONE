/**
 * Fungsi untuk membuat route pada server Hapi.
 * @param {(data: import("@hapi/hapi").ServerRoute | import("@hapi/hapi").ServerRoute[]) => void} route
 */
function pertanyaan(route) {
  route({
    method: "GET",
    path: "",
    handler: (request, h) => {
        return {
        "komedo_hitam": "1. Apakah terlihat komedo hitam di permukaan kulit? (ya/tidak): ",
        "titik_putih": "2. Apakah terdapat titik putih kecil? (ya/tidak): ",
        "berisi_nanah": "3. Apakah jerawat berisi nanah? (ya/tidak): ",
        "benjolan_merah": "4. Apakah muncul benjolan merah tanpa nanah? (ya/tidak): ",
        "benjolan_besar": "5. Apakah benjolan cukup besar atau dalam? (ya/tidak): ",
        "nyeri": "6. Apakah terasa nyeri saat disentuh? (ya/tidak): ",
        "merah": "7. Apakah area sekitar jerawat terlihat kemerahan? (ya/tidak): ",
        "menyatu": "8. Apakah jerawat menyatu membentuk area luas? (ya/tidak): ",
        "tekstur_keras": "9. Apakah tekstur jerawat terasa keras saat disentuh? (ya/tidak): ",
    }
      },
    options: {
      description: "Halaman Utama",
      notes:
        "Ini adalah halaman utama dari API kami. Anda dapat mengakses endpoint lain untuk mendapatkan informasi lebih lanjut.",
      tags: ["api", "home"],
      
      
    },
  });
}

export default pertanyaan;
