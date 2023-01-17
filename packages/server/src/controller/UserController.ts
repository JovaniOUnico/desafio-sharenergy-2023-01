import { Request, Response } from 'express';
import userModel from "../database/UserModel";
import tokenModel from "../database/TokenModel";

const userController = {
  async list(_req: Request, res: Response): Promise<Response> {
    //verificar token de admin antes de retornar dados
    let users = await userModel.find({});

    return res.json(users);
  },
  async findByEmail(req: Request, res: Response): Promise<Response> {

    const { email } = req.params;
    let user = await userModel.find({email: email});

    return res.json(user);
  },
  async create(req: Request, res: Response): Promise<Response> {

    const { 
      name,
      email,
      password } = req.body;


    let status: string;
    if(email && name && password) {
      status = 'success';
    }

    try {
      const user = new userModel({ 
        name,
        email,
        password });

      await user.save();

      status = 'success';
    } catch (err) {
      status = 'error'
    }

    return res.json({ status: status, user: {name, email} });
  },
  async login(req: Request, res: Response): Promise<Response> {

    const { 
      email,
      password } = req.body;

    let user = await userModel.find({email: email, password: password});
    
    let hasUser = false;
    let token: string;
    let name: string | undefined = '';
    if(user.length > 0) {
      hasUser = true;
      token = email + password;
      name = user[0].name;

      const token_aux = new tokenModel({ 
        token: token,
        user_id: user[0]._id,
        device: "device",
        expires: 'data' });
  
      await token_aux.save();
    } else {
      token = '';
    }

    let response = {
      user: {name: name, email: email},
      token: token,
      hasUser: hasUser,
      status: 'success'
    }

    return res.json(response);    
  },
  async logout(req: Request, res: Response): Promise<Response> {

    const { 
      token,
      email } = req.body;

    let tokenUser = await tokenModel.find({token: token});

    let logoutSuccess = false;

    if(tokenUser.length > 0) {
      let token_id = tokenUser[0]._id;
      let user_id = tokenUser[0].user_id;
      let user = await userModel.find({_id: user_id, email: email});

      if(user.length > 0) {
        const token = await tokenModel.findByIdAndDelete(token_id);

        logoutSuccess = true

        if (!token) {
          logoutSuccess = false
        }
      }

    }

    let response = {
      logoutSuccess: logoutSuccess,
      status: 'success'
    }

    return res.json(response);
  },
  async verify(req: Request, res: Response): Promise<Response> {

    const { token } = req.body;

    let tokenUser = await tokenModel.find({token: token});

    let userIsVerified = false;
    let name: string | undefined;
    let email: string | undefined;
    let password: string | undefined;

    if(tokenUser.length > 0) {
      let user_id = tokenUser[0].user_id;
      let user = await userModel.find({_id: user_id});

      //TODO atualizar token na hora

      if(user.length > 0) {
        name     = user[0].name;
        email    = user[0].email;
        password = user[0].password;

        userIsVerified = true;
      }

    }

    let response = {
      userIsVerified: userIsVerified,
      user: { name: name, email: email, password: password },
      status: 'success'
    }

    return res.json(response);
  }
}

export { userController }