import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserService } from '../services/UserService';
const serviceChunk = new UserService();

class FrontController {
    public static login = (req: Request, res: Response) => {

    }
}

export default FrontController;
