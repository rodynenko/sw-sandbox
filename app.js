const express = require('express');
const app = express();
const expressStylus = require('express-stylus-middleware');

app.set('port', process.env.PORT || 3000);
app.use('/css', expressStylus(__dirname + '/stylus-css/', { compress: true}));
app.use(express.static('public'));
app.set('views', "./views");
app.set('view engine', 'pug');

const routes = require('./routes');
app.use(routes);

app.listen(app.get('port'), () => {
	console.log("Express server is running on port " + app.get('port'));
});
