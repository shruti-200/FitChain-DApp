const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));
app.get('/product', (req, res) => res.render('product'));
app.get('/transaction', (req, res) => res.render('transaction'));
app.get('/about', (req, res) => res.render('about'));


// Dynamic port for AWS/Local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});