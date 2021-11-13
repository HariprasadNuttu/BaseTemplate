// import Logger from '../loaders/logger';
import express, { Application } from "express";
import cors from "cors";
import passport from "passport";
import bodyParser from "body-parser";
import cookieParse from "cookie-parser";
import session from "express-session";
import { AuthRouter , UserRouter } from "@/api/routes";
import "../api/auth/passportHandler"

const WHITELIST_HOSTS = ["http://localhost:3001"];

export default ({ app }: { app: express.Application }) => {

  app.use(
    cors({
      origin: (origin: any, callback: any) => {
        if (WHITELIST_HOSTS.indexOf(origin) !== -1 || !origin) {
          return callback(null, true);
          // return false;
        } else {
          // Logger.error("===========", origin);
          console.log("Origin Request", origin);
          return callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  /** Parse Request Cookies */
  app.use(cookieParse());

  /** Parse input body as JSON */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(express.urlencoded({ extended: true }))

  /** Session handler Middleware */
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: "jhgsjofs",
      resave: true,
      saveUninitialized: true,
      // cookie: { sameSite: "none", secure: true },
      // expires: Date.now() + 60 * 60 * 1000
    })
  );


  app.use(session({ secret: 'anything', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((userinstance, done) => done(null, userinstance));
  passport.deserializeUser((userinstance, done) => done(null, userinstance));
  app.use("/auth", AuthRouter);
  app.use(passport.authenticate('jwt', { session: true }));
  app.use("/user", UserRouter);
  /** Import Authentication Router */


  app.use(async (req: any, res: any, next: any) => {
    if (process.env.NODE_ENV === "development") {
      return next();
    }
    try {
      //   await TokenService.tokenAuthenticate(req,res,next)
      return next();
    } catch (err) {
      return next(err);
    }
  });

  
};
