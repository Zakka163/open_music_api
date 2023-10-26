require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');


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

// users
const users = require('./api/users/index')
const users_service = require('./services/postgres/users_service')
const users_validator = require('./validator/users/index')

// playlists
const playlists = require('./api/playlists/index')
const playlists_service = require('./services/postgres/playlists_service')
const playlists_songs_service = require('./services/postgres/playlists_songs_service')
const playlists_validator = require('./validator/playlists/index')

// authentications
const authentications = require('./api/authentications/index')
const authentications_service = require('./services/postgres/authentications_service')
const authentications_validator = require('./validator/authentications/index')
const token_manager = require('./tokenize/token_manager')



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
  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('auth', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });
  
  await server.register([
  {
    plugin: songs,
    options: {
      service: new songs_service(),
      validator: songs_validator,
    }
  }, 
  {
    plugin: albums,
    options: {
      service: new albums_service(),
      validator: albums_validator,
    }
  },
  {
    plugin: playlists,
    options: {
      playlists_service: new playlists_service(),
      playlists_songs_service: new playlists_songs_service(),
      validator: playlists_validator,
    }
  },
  {
    plugin: users,
    options: {
      service: new users_service(),
      validator: users_validator,
    }
  },
  {
    plugin: authentications,
    options: {
      auth_service:new authentications_service(), 
      user_service:new users_service(), 
      token_manager, 
      validator:authentications_validator,
    },
  },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
