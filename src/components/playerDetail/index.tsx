import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import ImgView from '../ImgView';
// import history from '../../history';
import Toast from '../Toast';
import * as classNames from 'classnames';
import { PlayerData } from '../../interface/matchDetail';
import heroStats, { Heroes } from '../../interface/heros';
import getKDA from '../../utils/getKDA';

const itemDict = require('../../assets/json/items.json');
const itemIds = require('../../assets/json/item_ids.json');

interface Props {
  item: PlayerData;
  totalDamage: number;
  totalCount: number;
  type: 'rd' | 'dr';
  toggle: (slot: number | string) => void;
  onSelect: string | number;
}

interface State {
  toggle: boolean;
}

class PlayerDetail extends React.Component <Props> {
  
  constructor(props: Props) {
    super(props);


  }

  public state: State = {
    toggle: false,
  }

  public hero: Heroes = undefined;

  public componentWillMount(): void {
    for (let i = 0; i < heroStats.heroArray.length; i++) {
      if (heroStats.heroArray[i].id === this.props.item.hero_id) {
        this.hero = heroStats.heroArray[i];
        break;
      }
    }
  }

  public click(): void {
    if (this.props.item.player_slot === this.props.onSelect) {
      this.setState({
        toggle: !this.state.toggle
      })
    } else {
      this.props.toggle(this.props.item.player_slot);
      this.setState({
        toggle: true
      })
    }
  }
  
  public render(): JSX.Element {

    const {item, type, totalCount, totalDamage, onSelect} = this.props;

    return (
      <div>
        <div className={styles.block}
        onClick={() => this.click()}
        >
          <div className={styles.upBlock}>
            <ImgView
            className={styles.heroIcon}
            src={this.hero.img}
            host={config.global.domain}
            />
            <div className={styles.leftInfo}>
              <div className={type === 'rd' ? styles.nameRd : styles.nameDr}>
              {item.personaname ? item.personaname : '匿名玩家'}
              </div>
              <div className={styles.rowBottom}>
                <div className={styles.rowBottomInfoLeft}>
                  <div className={styles.infoData}>参战率: {((item.kills+item.assists)/totalCount*100).toFixed(1) + '%'}</div>
                  <div className={styles.infoData}>伤害比: {(item.hero_damage/totalDamage*100).toFixed(1) + '%'}</div>
                </div>
                <div className={styles.rowBottomInfoRight}>
                  <div className={styles.infoData}>{item.kills + '/' + item.deaths + '/' + item.assists}</div>
                  <div className={styles.infoData}>KDA: {getKDA(item.kills, item.deaths, item.assists)}</div>
                </div>
              </div>
            </div>
            <div className={styles.itemBlock}>
              {
                [item.item_0, item.item_1, item.item_2, item.item_3, item.item_4, item.item_5
                ].map((id, i) => {
                  if (id === 0) {
                    return (
                      <ImgView
                      className={styles.item}
                      src={''}
                      key={item.account_id + i}
                      />
                    )
                    } else return (
                      <ImgView
                      className={styles.item}
                      src={itemDict[itemIds[id]].img}
                      host={config.global.domain}
                      key={item.account_id + i}
                      />
                    )
                })
              }
            </div>
          </div>
          {
            item.player_slot === onSelect && this.state.toggle ? (
              <div className={styles.extensionBlock}>
                <div className={styles.extTitleRow}>
                  <div className={styles.extInfo}>ID: {item.account_id ? item.account_id : '--'}</div>
                  <div className={styles.rightItemImg}>
                  {
                    [item.backpack_0, item.backpack_1, item.backpack_2
                    ].map((id, i) => {
                      if (id === 0) {
                        return (
                          <ImgView
                          className={styles.item}
                          src={''}
                          key={item.account_id + i}
                          />
                        )
                        } else return (
                          <ImgView
                          className={styles.itemBackpack}
                          src={itemDict[itemIds[id]].img}
                          host={config.global.domain}
                          key={item.account_id + i}
                          />
                        )
                    })
                  }
                  </div>
                </div>
                这块功能没有做完，好几把难做艹
              </div>
            ) : <div className={styles.extensionHide}></div>
          }
        </div>
      </div>
    )
  }
}


export default PlayerDetail;