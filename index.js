const express = require('express')
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.post('/contact', (req, res) => {
    console.log(req.body);
    res.status(204).send();
});


app.listen(PORT, () => console.log('Server is listening on port ' + PORT));