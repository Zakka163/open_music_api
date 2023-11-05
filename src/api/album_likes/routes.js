const routes = (handler) => [
	{
		method: 'POST',
		path: '/albums/{id}/likes',
		handler: (request, h) => handler.likes_album(request, h),
		options: {
			auth: 'auth'
		}
	},
	{
		method: 'DELETE',
		path: '/albums/{id}/likes',
		handler: (request, h) => handler.cancel_likes_album(request, h),
		options: {
			auth: 'auth'
		}
	},
	{
		method: 'GET',
		path: '/albums/{id}/likes',
		handler: (request, h) => handler.get_likes_album(request, h)
	}
];

module.exports = routes;
