import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter= Router();

usersRouter.post('/', async (request, response) =>{
    try{
        const {name, email, password}= request.body;

        const createUser= new CreateUserService();

        const {id}= await createUser.execute({name, email, password});
        //delete user.password: Deu erro no typeScript
        //return response.json(user)

        return response.json({id, name, email});
    }catch (err){
        return response.status(400).json({error: err.message})
    }

});

export default usersRouter;