const path = require('path')

const express = require('express');
const cors = require('cors');
const {create} = require('express-handlebars');
const morgan = require('morgan')
const multer = require('multer')
const errorhandler = require('errorhandler')

const {dbConnection} = require('../db/config');


class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.hbsConfig = create({
            extname: '.hbs',
            defaultLayout:'main',
            layoutsDir: path.join(this.app.get('views'),'layouts'),
            partialsDir: path.join(this.app.get('views'),'partials'),
            helpers:require('../server/helpers')
        })
        // Paths
        this.path = {
            images   : '/',
        };

        // DB
        this.conectarDB();

        // Listen
        this.listen();

        // Settings
        this.settings();

        // Middlewares
        this.middlewares();

        // ErrorHandler
        this.errorHandler();

        // Rutas
        this.routes();
        
    };

    async conectarDB(){
        await dbConnection()

    };

    settings(){
        this.app.set('views', './views');
        this.app.engine('hbs', this.hbsConfig.engine);
        this.app.set('view engine', '.hbs');
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(multer({dest:path.join(__dirname,'../public/upload/temp')}).single('image'))
        this.app.use(express.urlencoded({extended:false}))
        this.app.use('/public',express.static('public'))
        
    }

    errorHandler(){
        if (this.app.get('env') === 'development') {
            this.app.use(errorhandler())
        }
    }

    routes(){
        this.app.use(this.path.images,require('../routes/images'));
    };

    listen(){
        this.app.listen(this.port,()=>{
            console.log('app running on port',this.port);
        })

    };

}

module.exports = Server