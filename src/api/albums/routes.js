const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: (request, h) => handler.add_albums(request, h)
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: (request, h) => handler.get_albums_by_id(request, h),
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: (request, h) => handler.edit_albums(request, h),
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: (request, h) => handler.delete_albums(request, h),
  },
];

module.exports = routes;
