const routes = (handler) => [
	{
		method: 'POST',
		path: '/albums',
		handler: (request, h) => handler.add_albums(request, h)
	},
	{
		method: 'GET',
		path: '/albums/{id}',
		handler: (request, h) => handler.get_albums_by_id(request, h)
	},
	{
		method: 'PUT',
		path: '/albums/{id}',
		handler: (request, h) => handler.edit_albums(request, h)
	},
	{
		method: 'DELETE',
		path: '/albums/{id}',
		handler: (request, h) => handler.delete_albums(request, h)
	},
	{
		method: 'POST',
		path: '/albums/{id}/covers',
		handler: (request, h) => handler.add_cover_albums(request, h),
		options: {
			payload: {
				allow: 'multipart/form-data',
				multipart: true,
				output: 'stream',
				maxBytes: 512000
			}
		}
	}
];

module.exports = routes;
