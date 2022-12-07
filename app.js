import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { connectDB } from './config/db';
import posts from './routes/posts';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.json());
connectDB();
app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))

app.use('/posts', posts);
const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server da connected at port ${PORT}`);
})