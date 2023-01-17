import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type Next = () => Promise<any>

/* export const verifyToken = (req: Request, res: Response, next: Next) => {

  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  let privateToken = 'configTOKEN';

  try {
    jwt.verify(token, privateToken, (err, token) => {
      if (err) {
        res.status(403).end();
        return;
      }

      req.user = token;
      
      next();
    });

  } catch (err) {
    return res.status(401).send("Invalid Token");

  }

}; */