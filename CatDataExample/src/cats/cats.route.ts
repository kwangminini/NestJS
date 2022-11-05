import { Cat, CatType } from "./cats.model";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send({ cats: Cat });
});

router.get("/cats/som", (req: Request, res: Response) => {
  res.send({ som: Cat[1] });
});

//고양이 데이터 전부 조회
router.get("/cats", (req: Request, res: Response) => {
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
router.get("/cats/:id", (req: Request, res: Response) => {
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
router.post("/cats", (req: Request, res: Response) => {
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

export default router;