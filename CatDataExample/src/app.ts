import * as express from "express";
import { Cat, CatType } from "./app.model";
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

//고양이 데이터 전부 조회
app.get("/cats", (req: express.Request, res: express.Response) => {
  try {
    const cats = Cat;
    // throw new Error("db connect error");
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//특정 고양이 데이터 조회
app.get("/cats/:id", (req: express.Request, res: express.Response) => {
  try {
    const params = req.params;
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    // throw new Error("db connect error");
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//고양이 데이터 추가
app.post("/cats", (req: express.Request, res: express.Response) => {
  try {
    const data = req.body;
    Cat.push(data); //Create
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
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
