import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController {
  async index (request: Request, response: Response) {
  
    /*const search = String(request.query.search);
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
    return response.json({ message: 'Hello World' });*/
  
    const items = await knex('items').select('*');
  
    const serializedItems = items.map(item => {
      return { 
        id: item.id,
        title: item.title,
        image_url: `http://192.168.3.102:3333/uploads/${item.image}`}  
    })
  
    return response.json(serializedItems);
  };

}

export default ItemsController;