import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();
const port: number = 8000;

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }
  private setMiddleware() {
    //전체 라우터에 걸리는 미들웨어
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log("req :::", req.rawHeaders[1]);
        next();
      }
    );

    //body값의 JSON을 읽기 위한 미들웨어 추가
    this.app.use(express.json());
    this.setRoute();
    //위에 라우터에서 안걸렸을 때 (에러 라우터에 걸리는 미들웨어)
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.send({ error: `404 not found` });
      }
    );
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
