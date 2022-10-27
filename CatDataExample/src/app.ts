import * as express from "express";
import { Cat, CatType } from "app.model";
const app: express.Express = express();
const port: number = 8000;

//전체 라우터에 걸리는 미들웨어
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("req :::", req.rawHeaders[1]);
    next();
  }
);

app.get("/", (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send({ cats: Cat });
});

// /cats/som에만 걸리는 미들웨어 (미들웨어는 순서가 중요)
// app.use(
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     console.log("req :::", req.rawHeaders[1]);
//     next();
//   }
// );

// /cats/som에만 걸리는 미들웨어 (use는 전체적으로, get으로 특정 라우터에만 미들웨어 설정 가능)
// app.get(
//   "/cats/som",
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     console.log("req :::", req.rawHeaders[1]);
//     next();
//   }
// );
app.get("/cats/som", (req: express.Request, res: express.Response) => {
  res.send({ som: Cat[1] });
});

//위에 라우터에서 안걸렸을 때 (에러 라우터에 걸리는 미들웨어)
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send({ error: `404 not found` });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
