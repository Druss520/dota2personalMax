import config from '../config';

export default function(tier: number, leaderboardrank: number): string {
  let img;
  switch(tier) {
    case null: 
      img = config.img.unknownTier;
      break;
    case 11: 
      img = config.img.herad1;
      break;
    case 12:
      img = config.img.herad2;
      break;
    case 13:
      img = config.img.herad3;
      break;
    case 14:
      img = config.img.herad4;
      break;
    case 15:
      img = config.img.herad5;
      break;
    case 21:
      img = config.img.gardian1;
      break;
    case 22:
      img = config.img.gardian2;
      break;
    case 23:
      img = config.img.gardian3;
      break;
    case 24:
      img = config.img.gardian4;
      break;
    case 25:
      img = config.img.gardian5;
      break;
    case 31:
      img = config.img.crusader1;
      break;
    case 32:
      img = config.img.crusader2;
      break;
    case 33:
      img = config.img.crusader3;
      break;
    case 34:
      img = config.img.crusader4;
      break;
    case 35:
      img = config.img.crusader5;
      break;
    case 41:
      img = config.img.archon1;
      break;
    case 42:
      img = config.img.archon2;
      break;
    case 43:
      img = config.img.archon3;
      break;
    case 44:
      img = config.img.archon4;
      break;
    case 45:
      img = config.img.archon5;
      break;
    case 51:
      img = config.img.legend1;
      break;
    case 52:
      img = config.img.legend2;
      break;
    case 53:
      img = config.img.legend3;
      break;
    case 54:
      img = config.img.legend4;
      break;
    case 55:
      img = config.img.legend5;
      break;
    case 61:
      img = config.img.ancient1;
      break;
    case 62:
      img = config.img.ancient2;
      break;
    case 63:
      img = config.img.ancient3;
      break;
    case 64:
      img = config.img.ancient4;
      break;
    case 65:
      img = config.img.ancient5;
      break;
    case 71:
      img = config.img.divine1;
      break;
    case 72:
      img = config.img.divine2;
      break;
    case 73:
      img = config.img.divine3;
      break;
    case 74:
      img = config.img.divine4;
      break;
    case 75:
      img = config.img.divine5;
      break;
    case 80:
      if (leaderboardrank === null || ((leaderboardrank > 100 && leaderboardrank <= 1000))) {
        img = config.img.immortal1
      } else if (leaderboardrank > 10 && leaderboardrank <= 100) {
        img = config.img.immortal3
      } else {
        img = config.img.immortal4
      }
      break;
    default:
      break;
  }

  return img;
}