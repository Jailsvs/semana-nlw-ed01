import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

const upload = multer(multerConfig);

//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessando do sistema
//Request Param: params que vem na propria rota que identificam um recurso
//Query Param: params que vem na propria rota geralmente opcionais p/ filtros, paginacao
//Request Body: params p/ criação/atualização de informações

//const users = ['Jailson', 'Jose', 'Andrei', 'Kelvin'];

//padrão: index, show, create ou store, update, delete ou destroy
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', 
            upload.single('image'),  
            celebrate({
              body: Joi.object().keys({
              name: Joi.string().required(),
              email: Joi.string().required().email(),
              whatsapp: Joi.number().required(),
              latitude: Joi.number().required(),
              longitude: Joi.number().required(),
              city: Joi.string().required(),
              uf: Joi.string().required().max(2),
              items: Joi.string().required()
              })
            },
            {
              abortEarly: false
            }),
            pointsController.create);

export default routes;

//Service Pattern
//Repository Pattern (Data Mapper)