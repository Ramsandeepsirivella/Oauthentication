const passport =require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({

    //options for the google strat
   callbackURL:'/auth/google/redirect', 
   clientID: '647740973847-gfkhs4433fhfpcbu6jg0e2e9riic14ar.apps.googleusercontent.com',
    clientSecret:'tWlFCamxol01Ig1SJpPWa7Y0'

},(accessToken,refreshToken,profile,done) =>
{
//passport callback function
User.findOne({googleId: profile.id}).then((currentUser) => {
    if(currentUser){
        // already have this user
        console.log('user is: ', currentUser);
        done(null, currentUser);
    } else {
        // if not, create user in our db
        new User({
            googleId: profile.id,
            username: profile.displayName
        }).save().then((newUser) => {
            console.log('created new user: ', newUser);
            done(null, newUser);
        });
    }
});
})
);