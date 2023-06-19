/* eslint-disable @typescript-eslint/typedef */
import type { Player } from '../models/Player';
import type { Request, Response, Router } from 'express';

import * as express from 'express';

import { internalServerError } from '../costants/constants';
import { PlayerService } from '../services/PlayerService';
import { NotFound } from '../types/errors/errors';

const playerRouter: Router = express.Router();
const playerService: PlayerService = PlayerService.getPlayerService();

playerRouter.route('/')
  .get(
    async (req: Request, res: Response) => {
      try {
        const players: Player[] = await playerService.getListOfPlayers();
        res.json(players);
      } catch (e) {
        console.error(e);
        res.status(500).json(internalServerError);
      }
    })

  .post(async (req: Request<unknown, unknown, Player>, res: Response) => {
    try {
      const playerInserted: Player = await playerService.createPlayer(req.body);
      res.status(200).json(playerInserted);
    } catch (e) {
      console.error(e);
      res.status(500).json(internalServerError);
    }
  });

playerRouter.route('/:id')
  .get(async (req: Request, res: Response) => {
    try {
      const playerFound = await playerService.getPlayer(req.params.id);
      res.json(playerFound);
    } catch (e) {
      console.error(e);
      if (e instanceof NotFound) {
        res.status(404).json(e.jsonError);

        return;
      }
      res.status(500).json(internalServerError);
    }
  })

  .delete(async (req: Request, res: Response) => {
    try {
      await playerService.deletePlayer(req.params.id);
      res.status(200).send();
    } catch (e) {
      console.error(e);
      if (e instanceof NotFound) {
        res.status(404).json(e.jsonError);

        return;
      }
      res.status(500).json(internalServerError);
    };
  })

  .put(async (req: Request, res: Response) => {
    try {
      const attributeToUpdate: Partial<Player> = req.body as Partial<Omit<Player, '__v' | '_id'>>;
      const playerUpdated: Player = await playerService.updatePlayer(req.params.id, attributeToUpdate);
      res.status(200).json(playerUpdated);
    } catch (e) {
      console.error('API failed');
      if (e instanceof NotFound) {
        res.status(404).json(e.jsonError);

        return;
      }
      res.status(500).json(internalServerError);
    }
  });

export { playerRouter };

