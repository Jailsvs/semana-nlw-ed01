import knex from '../database/connection';
import { Request, Response } from 'express';

class PointsController {

  async index (request: Request, response: Response) {
    const { city, uf, items } = request.query;
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(points);
  }

  async show (request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json( {message: 'Point not found!'} );
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id).select('items.title');

    return response.json({point,
                          items
                          });
  }
  async create (request: Request, response: Response) {

    const { 
          name, 
          email, 
          whatsapp, 
          latitude, 
          longitude, 
          city, 
          uf, 
          items } = request.body;
  
    const trx = await knex.transaction();

    const point = { 
      image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fa.cdn-hotels.com%2Fgdcs%2Fproduction73%2Fd661%2F377b8a64-f7af-4282-997f-67dd9932ae48.jpg&imgrefurl=https%3A%2F%2Fwww.hotels.com%2Fgo%2Findonesia%2Fbadung-market&tbnid=YAXKRXE5BF_eJM&vet=12ahUKEwiS6fjm8ubpAhVhB7kGHcA1DSwQMyhVegUIARDEAQ..i&docid=-aFX4QC-vgwR8M&w=1600&h=1067&q=market&ved=2ahUKEwiS6fjm8ubpAhVhB7kGHcA1DSwQMyhVegUIARDEAQ',
      name: name, 
      email, 
      whatsapp, 
      latitude,
      longitude, 
      city, 
      uf };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];  

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: point_id
      };
    })

    //console.log(pointItems);
    await trx('point_items').insert(pointItems); 

    await trx.commit();
    
    return response.json({ 
        id: point_id,
        ...point  //...point todas as info do object
     });

  };
}

export default PointsController;