import Joi from "joi";
/**
 * Fungsi untuk membuat route pada server Hapi.
 * @param {(data: import("@hapi/hapi").ServerRoute | import("@hapi/hapi").ServerRoute[]) => void} route
 */
function terima(route) {
   route({
    method: "POST",
    path: "/",
    options: {
      description: "Form Gejala dengan Gambar",
      notes: "Menerima 1 file gambar dan 9 field string ('ya' atau 'tidak')",
      tags: ["api", "predict"],
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
        maxBytes: 1024 * 1024 * 5, // 5MB
      },
       plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      validate: {
        payload: {
          file: Joi.object().required().meta({ swaggerType: 'file' }).description('File to upload'),
        komedo_hitam: Joi.string()
            .valid('ya', 'tidak')
            .required()
            .description("Komedo hitam ('ya' atau 'tidak')"),
          titik_putih: Joi.string()
            .valid('ya', 'tidak')
            .required()
            .description("Titik putih ('ya' atau 'tidak')"),
          berisi_nanah: Joi.string()
            .valid('ya', 'tidak')
            .required()
            .description("Berisi nanah ('ya' atau 'tidak')"),
          benjolan_merah: Joi.string()
            .valid('ya', 'tidak')
            .required()
            .description("Benjolan merah ('ya' atau 'tidak')"),
          benjolan_besar: Joi.string()
            .valid('ya', 'tidak')
            .required()
            .description("Benjolan besar ('ya' atau 'tidak')"),
          nyeri: Joi.string()
            .valid('ya', 'tidak')
            .required()
            .description("Nyeri ('ya' atau 'tidak')"),
          merah: Joi.string()
            .valid('ya', 'tidak')
            .required()
            .description("Merah ('ya' atau 'tidak')"),
          menyatu: Joi.string()
            .valid('ya', 'tidak')
            .required()
            .description("Menyatu ('ya' atau 'tidak')"),
          tekstur_keras: Joi.string()
            .valid('ya', 'tidak')
            .required()
            .description("Tekstur keras ('ya' atau 'tidak')")
        }
      },
    },
    handler: async (request, h) => {
      const { file, ...fields } = request.payload;
      console.log("Fields:", fields);
      // Anda bisa menyimpan file di sini jika perlu
      return {
        message: "Data dan file diterima",
        namaFile: file.hapi.filename,
        data: fields
      };
    }
  });
}

export default terima;