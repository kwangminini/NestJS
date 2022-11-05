import { Cat, CatType } from "./cats.model";
import { Router, Request, Response } from "express";
import {
  createCat,
  deleteCat,
  readAllcat,
  readCat,
  updateCat,
  updatePartialCat,
} from "./cats.service";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send({ cats: Cat });
});

router.get("/cats/som", (req: Request, res: Response) => {
  res.send({ som: Cat[1] });
});

//고양이 데이터 전부 조회
router.get("/cats", readAllcat);

//특정 고양이 데이터 조회
router.get("/cats/:id", readCat);

//고양이 데이터 추가
router.post("/cats", createCat);

//고양이 데이터 수정
router.put("/cats:id", updateCat);

//고양이 데이터 부분적으로 업데이트
router.patch("/cats:id", updatePartialCat);

//고양이 데이터 삭제
router.delete("/cats:id", deleteCat);

export default router;
