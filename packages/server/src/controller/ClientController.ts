import { Request, Response } from 'express';
import clientModel from "../database/ClientModel";

const clientController = {
  async index(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;

    let user = await clientModel.find({email: email});

    return res.json(user);
  },
  async list(_req: Request, res: Response): Promise<Response> {
    //verificar token de admin antes de retornar dados
    let users = await clientModel.find({});

    return res.json(users);
  },
  async create(req: Request, res: Response): Promise<Response> {

    const { 
      nome,
      email,
      telefone,
      endereco,
      cpf } = req.body;


    let status: string;
    if(nome &&
       email &&
       telefone &&
       endereco &&
       cpf) {
      status = 'success';
    }

    try {
      const client = new clientModel({
        nome,
        email,
        telefone,
        endereco,
        cpf });

      await client.save();

      status = 'success';
    } catch (err) {
      status = 'error'
    }

    //TODO send id
    return res.json({ status: status, client: {
      nome,
      email,
      telefone,
      endereco,
      cpf }});
  },
  async edit(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { nome,
            email,
            telefone,
            endereco,
            cpf } = req.body;

    let updatedClient = { nome,
                          email,
                          telefone,
                          endereco,
                          cpf }

    //verificar token de admin antes de retornar dados
    try {
      let client = await clientModel.findByIdAndUpdate(id, updatedClient, {new: true})
      return res.json({status: 'success',
                       client: client});
    }catch (err) {
      return res.status(500).send(err);
    }

  },
  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const removedClient = clientModel.findByIdAndRemove(id);

    let clientRemoved = true;

    if(!removedClient) {
      clientRemoved = false;
    }

    let response = {
      clientRemoved: clientRemoved,
      status: 'success'
    }

    return res.json(response);
  },
}

export { clientController }