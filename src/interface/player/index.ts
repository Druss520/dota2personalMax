import { observable } from 'mobx';
import getPlayer from './getPlayer';
import getRecentMatch from './getRecentMatches';
import getWinLose from './getWinLose';

const account_id = 192820722;

class Player {
  @observable totalData: any | undefined;

}

const player = new Player;

export default player;