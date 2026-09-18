const express = require('express');
const cors = require('cors');
const authRoutes = require('./modules/auth/auth.routes');
const usersRoutes = require('./modules/users/users.routes');
const nichesRoutes = require('./modules/niches/niches.routes');
const discoveryRoutes = require('./modules/discovery/discovery.routes');
const connectsRoutes = require('./modules/connects/connects.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/niches', nichesRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/providers', discoveryRoutes);
app.use('/connects', connectsRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;