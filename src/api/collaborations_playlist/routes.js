const routes = (handler) => [
{
      method: 'GET',
      path: '/collaborations_playlist',
      handler: (request, h) => handler.tes(request, h),
  },
  // {
  //   method: 'POST',
  //   path: '/songs',
  //   handler: (request, h) => handler.add_songs(request, h)
  // },
  // {
  //   method: 'GET',
  //   path: '/songs/{id}',
  //   handler: (request, h) => handler.get_songs_by_id(request, h),
  // },
  // {
  //   method: 'GET',
  //   path: '/songs',
  //   handler: (request, h) => handler.get_songs(request, h),
  // },
  // {
  //   method: 'PUT',
  //   path: '/songs/{id}',
  //   handler: (request, h) => handler.edit_songs(request, h),
  // },
  // {
  //   method: 'DELETE',
  //   path: '/songs/{id}',
  //   handler: (request, h) => handler.delete_songs(request, h),
  // },
];

module.exports = routes;
