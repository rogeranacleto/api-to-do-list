import App from "./app";
import { envs } from "./envs";
import {
  AuthRoutes,
  ExampleRoutes
} from "./routes";

const app = new App(
  [
    AuthRoutes.bind(),
    ExampleRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();
