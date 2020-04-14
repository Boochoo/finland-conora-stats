const express = require('express');
const next = require('next');
const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/', (req, res) => app.render(req, res, '/', req.query));
    server.get('/world', (req, res) =>
      app.render(req, res, '/world', req.query)
    );

    server.get('/country/:id', (req, res) => {
      return app.render(
        req,
        res,
        '/country',
        Object.assign({ id: req.params.id }, req.query)
      );
    });

    /*    
    server.get('/country', (req, res) => {
      if (req.params.id) return res.redirect(`/country?id=${req.query.id}`);

      res.redirect(301, '/world');
    }); 
    */

    server.get('*', (req, res) => handle(req, res));

    server.listen(PORT, err => {
      if (err) throw err;

      console.log(dev);

      console.log(`> ready on ${PORT}`);
    });
  })
  .catch(execution => {
    console.error(execution.stack);
    process.exit(1);
  });
