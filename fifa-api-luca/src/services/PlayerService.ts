
import type { Player } from '../models/Player';
import type { GenericError } from '../types/GenericError';

import { playerModel } from '../models/Player';
import { NotFound } from '../types/errors/errors';

export class PlayerService {
  private static instance?: PlayerService;

  public static getPlayerService(): PlayerService {
    if (!PlayerService.instance)
      PlayerService.instance = new PlayerService();

    return PlayerService.instance;
  }

  public async getPlayer(id: string): Promise<Player> {
    const playerFound: Player | null = await playerModel.findById(id);

    if (playerFound === null)
      throw new NotFound({
        message: `Player with id ${id} not found`,
        explanation: 'Player id not found while getting player',
        action: 'Resubmit the request with a correct id player',
      });

    return playerFound;
  }

  public async getListOfPlayers(): Promise<Player[]> {
    const players: Player[] = await playerModel.find();

    return players;
  }

  public async createPlayer(newPLayer: Player): Promise<Player> {
    const insertedPlayer: Player = await playerModel.create(newPLayer);

    return insertedPlayer;
  }

  public async deletePlayer(_id: string): Promise<void> {
    const { acknowledged, deletedCount } = await playerModel.deleteOne({ _id });
    if (!acknowledged)
      throw new Error();
    if (!deletedCount)
      throw new NotFound({
        message: `Player with id ${_id} not found`,
        explanation: 'Player id not found while deleting player',
        action: 'Resubmit the request with a correct id player',
      } as GenericError);
  }

  public async updatePlayer(_id: string, updatePLayer: Partial<Player>): Promise<Player> {
    const playerUpdated: Player | null = await playerModel.findOneAndUpdate(
      { _id },
      {
        $set: updatePLayer,
      },
      {
        new: true,
      });

    if (playerUpdated === null)
      throw new NotFound({
        message: `Player with id ${_id} not found`,
        explanation: 'Player id not found while updating player',
        action: 'Resubmit the request with a correct id player',
      } as GenericError);

    return playerUpdated;
  }
}
