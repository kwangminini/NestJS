import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(req.ip);

    //response가 완료된 시점에 로깅
    res.on('finish', () => {
      this.logger.log(res.statusCode);
    });
    next();
  }
}
