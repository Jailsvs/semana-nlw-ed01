import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();
//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessando do sistema
//Request Param: params que vem na propria rota que identificam um recurso
//Query Param: params que vem na propria rota geralmente opcionais p/ filtros, paginacao
//Request Body: params p/ criação/atualização de informações

//const users = ['Jailson', 'Jose', 'Andrei', 'Kelvin'];

//padrão: index, show, create ou store, update, delete ou destroy
routes.get('/items', itemsController.index);
routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;

//Service Pattern
//Repository Pattern (Data Mapper)