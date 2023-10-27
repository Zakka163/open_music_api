const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: (request, h) => handler.add_playlists(request, h),
    options:{
      auth:"auth"
    }
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: (request, h) => handler.get_playlists(request, h),
    options:{
      auth:"auth"
    }
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: (request, h) => handler.delete_playlists(request, h),
    options:{
      auth:"auth"
    }
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: (request, h) => handler.add_playlists_songs(request, h),
    options:{
      auth:"auth"
    }
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: (request, h) => handler.get_playlists_songs(request, h),
    options:{
      auth:"auth"
    }
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: (request, h) => handler.delete_playlists_songs(request, h),
    options:{
      auth:"auth"
    }
  },
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: (request, h) => handler.get_playlists_activities(request, h),
    options:{
      auth:"auth"
    }
  },

];

module.exports = routes;
