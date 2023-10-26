const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: (request, h) => handler.add_playlists(request, h)
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: (request, h) => handler.get_playlists(request, h),
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: (request, h) => handler.delete_playlists(request, h),
  },
  // {
  //   method: 'GET',
  //   path: '/playlists',
  //   handler: (request, h) => handler.get_playlists(request, h),
  // },
  // {
  //   method: 'PUT',
  //   path: '/playlists/{id}',
  //   handler: (request, h) => handler.edit_playlists(request, h),
  // },

];

module.exports = routes;
