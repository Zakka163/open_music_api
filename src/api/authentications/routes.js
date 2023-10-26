


const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: (request, h) => handler.post_auth_handler(request, h)
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: (request, h) => handler.put_auth_handler(request, h)
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: (request, h) => handler.delete_auth_handler(request, h)
  },
];
 
module.exports = routes;