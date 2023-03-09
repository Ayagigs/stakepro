import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";
import userModel from "../models/user.model";

export function googleStrategy() {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:8080/api/v1/user/auth/google/callback",
                passReqToCallback: true,
            },
            async (_req, _accessToken, _refreshToken, profile, done) => {
                try {
                    const googleuser = {
                        googleId: profile.id,
                        username: profile._json.email.replace(/@.+/, ""),
                        email: profile._json.email,
                        last_name: profile._json.given_name,
                        first_name: profile._json.family_name,
                        picture: profile._json.picture,
                    };

                    let user = await userModel.findOne({ email: googleuser.email });
                    if (!user) user = await userModel.create(googleuser);
                    else {
                        user = await userModel.findOneAndUpdate(
                            { googleId: googleuser.googleId },
                            googleuser,
                            { new: true }
                        );
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
}