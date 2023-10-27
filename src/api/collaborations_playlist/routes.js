const routes = (handler) => [
	{
		method: 'POST',
		path: '/collaborations',
		handler: (request, h) => handler.add_collaborations(request, h),
		options: {
			auth: 'auth'
		}
	},
	{
		method: 'DELETE',
		path: '/collaborations',
		handler: (request, h) => handler.delete_collaborations(request, h),
		options: {
			auth: 'auth'
		}
	}
];

module.exports = routes;
