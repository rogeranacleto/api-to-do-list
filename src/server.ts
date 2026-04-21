import App from "./app";
import { envs } from "./envs";
import {
  AuthRoutes,
  ExampleRoutes,
  TaskRoutes,
} from "./routes";

const app = new App(
  [
    AuthRoutes.bind(),
    ExampleRoutes.bind(),
    TaskRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();
