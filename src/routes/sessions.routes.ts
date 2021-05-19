import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter= Router();

sessionsRouter.post('/', async (request, response) =>{
    try{

        const {email, password} = request.body;

        const authenticateUser = new AuthenticateUserService();

        const {id, name, created_at, updated_at}= await authenticateUser.execute({email, password});

        return response.json({id, name, email, created_at, updated_at});
    }catch (err){
        return response.status(400).json({error: err.message})
    }

});

export default sessionsRouter;