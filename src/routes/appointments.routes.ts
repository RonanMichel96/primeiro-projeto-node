import {Router} from 'express';

const appointmentsRouter= Router();

appointmentsRouter.post('/', (request, response) =>{
    return response.json({mensage: 'CHAMOU AQUI'});
});

export default appointmentsRouter;

