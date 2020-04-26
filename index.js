const hapi = require('@hapi/hapi')
// const inert = require('@hapi/inert')
// const vision = require('@hapi/vision')
const ejs = require('ejs')
const path = require('path')
const PORT = process.env.PORT || 5000

/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

*/

const server = hapi.Server({
  port: 3000
});

const init = async () => {

  await server.register([require('@hapi/inert'), require('@hapi/vision')]);

  server.views({
    engines: {
      ejs: ejs
    },
    relativeTo: __dirname,
    path: 'views/'
  });


  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.view('pages/index');
    }
  });


  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: 'public/'
      }
    }
  });

  await server.start();
  console.log('Server running at: ', server.info.uri);

};

init();
