require('dotenv').config();
const Hapi = require('@hapi/hapi');


// error

const client_error = require('./exceptions/client_error')

// albums

const albums = require('./api/albums/index')
const albums_service = require('./services/postgres/albums_service')
const albums_validator = require('./validator/albums/index')

// // songs

const songs = require('./api/songs/index')
const songs_service = require('./services/postgres/songs_service')
const songs_validator = require('./validator/songs/index')



const init = async () => {



  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    // console.log(response)
    if (response instanceof Error) {
      if (response instanceof client_error) {
        const new_response = h.response({
          status: 'fail',
          message: response.message,
        });
        new_response.code(response.statusCode);
        return new_response;
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }
      // penanganan server error sesuai kebutuhan
      const new_response = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      console.log(response)
      new_response.code(500);
      return new_response;
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  await server.register([{
    plugin: songs,
    options: {
      service: new songs_service(),
      validator: songs_validator,
    }
  }, {
    plugin: albums,
    options: {
      service: new albums_service(),
      validator: albums_validator,
    }
  }]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
