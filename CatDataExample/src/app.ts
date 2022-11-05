import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();
const port: number = 8000;

//전체 라우터에 걸리는 미들웨어
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("req :::", req.rawHeaders[1]);
    next();
  }
);

//body값의 JSON을 읽기 위한 미들웨어 추가
app.use(express.json());

app.use(catsRouter);

//위에 라우터에서 안걸렸을 때 (에러 라우터에 걸리는 미들웨어)
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send({ error: `404 not found` });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
