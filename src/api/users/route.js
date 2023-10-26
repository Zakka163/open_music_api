const routes = (handler) => [
   {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.add_users(request, h),
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request, h) => handler.get_users_by_id(request, h)
  },
];

module.exports = routes;
