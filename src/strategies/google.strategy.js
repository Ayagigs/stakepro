import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";
import userModel from "../models/user.model";
import ipinfo from "ipinfo"
import { IPINFO_TOKEN } from "../config";
import sendMail from "../utils/sendMail";
import requestIp from "request-ip"

export function googleStrategy() {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "https://stakepro.onrender.com/api/v1/user/auth/google/callback",
                passReqToCallback: true,
            },
            async (req, _accessToken, _refreshToken, profile, done) => {
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
                    const ipAddress = requestIp.getClientIp(req)

                    const data = await ipinfo(ipAddress, { token: IPINFO_TOKEN });

                    await sendMail({
                        to: googleuser.email,
                        subject: "acccount login",
                        html: `Location for ${data.ip}: ${data.city}, ${data.region}, ${data.country}`,
                    });

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
}