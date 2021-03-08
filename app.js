import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import "./passport";

const app = express();

const MongoStore = require("connect-mongo").default;

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-eval' * "
  );
  return next();
}); // fontawesome을 link가 아닌 script로 사용할 수 있음
app.use((req, res, next) => {
  res.setHeader(
    "Content_Security-Policy",
    "script-src 'self'https://achive.org"
  );
  return next();
}); //동영상 재생이 안될시 사용
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(express.static(__dirname + "/"));
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.video, videoRouter);

export default app;
