import type { ReturnModelType } from '@typegoose/typegoose';

import { Severity, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

import { Stat } from '../types/Stat';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Player {

  public _id?: string;
  public __v?: number;

  @prop({ require: true })
  public readonly name: string;

  @prop({ require: true })
  public readonly surname: string;

  @prop({ require: true })
  public readonly country: string;
  @prop()
  public team?: string;

  @prop({ require: true })
  public stats: Stat;

}

const playerModel: ReturnModelType<typeof Player> = getModelForClass(Player);
export { playerModel };
