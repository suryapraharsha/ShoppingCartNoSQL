const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;


const app = express();
//setting view engine as ejs 
app.set('view engine', 'ejs');
app.set('views', 'views');

//importing routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//importing models 
const User = require('./models/user');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findById("5cf6e44aeaff30105f84dc39")
      .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
      })
      .catch(err => console.log(err));
  });
  
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);
 app.use(errorController.get404);



mongoConnect(()=>{  
    
    app.listen(3000);
});