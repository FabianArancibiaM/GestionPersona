const express = require('express');
const morgan = require('morgan');
const {Mongoose} = require('./database');
const cors = require('cors');
const app = express();

// Settings 
app.set('port',process.env.PORT || 3000);
// Middleweares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));


// Rutes
app.use('/api/employee',require('./rutes/employee.routes'));


// Starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});