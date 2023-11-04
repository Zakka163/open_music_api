require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const plugins = require('./index.js');
const path = require('path')
const fs = require('fs')

// error
const client_error = require('./exceptions/client_error');


const init = async () => {

	const server = Hapi.server({
		port: process.env.PORT,
		host: process.env.HOST,
		routes: {
			cors: {
				origin: ['*']
			}
		}
	});

	// handling error
	server.ext('onPreResponse', (request, h) => {
		const { response } = request;
		// console.log(response)
		if (response instanceof Error) {
			if (response instanceof client_error) {
				const new_response = h.response({
					status: 'fail',
					message: response.message
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
				message: 'terjadi kegagalan pada server kami'
			});
			console.log(response);
			new_response.code(500);
			return new_response;
		}

		// jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
		return h.continue;
	});

	// registrasi plugin jwt
	await server.register([
		{
			plugin: Jwt
		}
	]);

	// strategi auth jwt
	server.auth.strategy('auth', 'jwt', {
		keys: process.env.ACCESS_TOKEN_KEY,
		verify: {
			aud: false,
			iss: false,
			sub: false,
			maxAgeSec: process.env.ACCESS_TOKEN_AGE
		},
		validate: (artifacts) => ({
			isValid: true,
			credentials: {
				id: artifacts.decoded.payload.id
			}
		})
	});
	server.route({
		method: 'POST',
		path: '/uploads',
		handler: async (request) => {


			console.log(request.payload.data)
			const filename = request.payload.data.hapi.filename
			const directory = path.resolve(__dirname, 'uploads');
			if(!fs.existsSync(directory)){
				fs.mkdirSync(directory);
			}
			const location =  `${directory}/${filename}`
			const fileStream = fs.createWriteStream(location);

			try{
				const result = await new Promise((resolve,reject)=>{
					fileStream.on('error', (error) => reject(error))
					request.payload.data.pipe(fileStream);
					request.payload.data.on('end', () => resolve(filename));
				})
				return { message: `Berkas ${result} berhasil diproses!` };
			}catch(err){
				return { message: `Berkas gagal diproses` };
			}
		},
		options: {
		  payload: {
		    allow: 'multipart/form-data',
		    multipart: true,
		    output:'stream'
		  },
		},
	});
	// registrasi plugins
	await server.register(plugins);


	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
