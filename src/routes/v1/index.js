const express = require('express');
// const authRoute = require('./auth.route');
// const userRoute = require('./user.route');
// const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

router.post('/testdata', (req, res) => {
  res.write('Player                  Score \n');
  res.write('Doom                    2504  \n');
  res.write('Final Frontier          2043  \n');
  res.write('Nighthawk               1765  \n');
  res.write('Blair Ripper            1598  \n');
  res.write('Slasher                 1330  \n');
  res.write('Secret Pariah           1102  \n');
  res.write('Unbridled               983   \n');
  res.write('Martial Warlock         600   \n');
  res.write('Dark Spirit             499   \n');
  res.write('Tito                    245   \n');
  res.end();
});

const defaultRoutes = [
  // {
  //   path: '/auth',
  //   route: authRoute,
  // },
  // {
  //   path: '/users',
  //   route: userRoute,
  // },
];

const devRoutes = [
  // routes available only in development mode
  // {
  //   path: '/docs',
  //   route: docsRoute,
  // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
