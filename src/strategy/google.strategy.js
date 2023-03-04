import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";
import userModel from "../models/user.model";

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/v1/user/auth/google/callback",
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const googleuser = {
                    googleId: profile.id,
                    username: profile._json.email.replace(/@.+/, ""),
                    email: profile._json.email,
                };

                let user = await userModel.findOne({
                    $or: [{ username: googleuser.username }, { email: googleuser.email }],
                });
                if (!user) user = await userModel.create(googleuser);
                else {
                    user = await userModel.findOneAndUpdate(
                        { googleId: googleuser.googleId },
                        googleuser,
                        { new: true }
                    );
                }
                return done(null, profile);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
        done(err, user);
    });
});
