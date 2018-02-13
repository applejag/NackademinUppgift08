import express from 'express';

const app = express();
const port = 8080;

app.use(express.static('dist/public'));
app.listen(port);

console.log(`Node server kör på http://localhost:${port}/`);