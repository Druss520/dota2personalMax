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
const abilityDict = require('../../assets/json/abilities.json');
const abilitiesIds = require('../../assets/json/ability_ids.json'); 

interface Props {
  item: PlayerData;
  totalDamage: number;
  totalCount: number;
  type: 'rd' | 'dr';
  toggle: (slot: number | string) => void;
  onSelect: string | number;
  providePro: boolean;
}

interface State {
  toggle: boolean;
}

class PlayerDetail extends React.Component <Props> {
  
  constructor(props: Props) {
    super(props);


  }

  public state: State = {
    toggle: true,
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

  public click(e: React.MouseEvent<HTMLDivElement>): void {
    // console.log(this.state.toggle);
    e.preventDefault();
    e.stopPropagation();
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

    const {item, type, totalCount, totalDamage, onSelect, providePro} = this.props;

    const DataListItem = (name, value) => {
      if (name === '线优') {
        value += '%';
      } else if (name === '全场控制') {
        value = value.toFixed(1) + 's'
      }
      return (
        <div className={styles.extInfoGroupItem}>
          <div className={styles.extItemName}>{name}:</div>
          {value!==null && value!==undefined ? value : '--'}
        </div>
      )
    }

    const getLanePos = (num: number, isRad: boolean) => {
      if (num === 1) {
        return isRad ? '优势路' : '劣势路'
      } else if (num === 2) {
        return '中路'
      } else if (num === 3) {
        return isRad ? '劣势路' : '优势路'
      } else if (num === 5) {
        return '刷野'
      }
    }

    const getMostKill =(obj: Object) => {
      if (obj === {}) {
        return '无'
      } else if (obj[5]) {
        return '暴走'
      } else if (obj[4]) {
        return '四杀'
      } else if (obj[3]) {
        return '三杀'
      } else if (obj[2]) {
        return '双杀'
      }
    }

    const giveArray = (obj: Object) => {
      let arr =[]
      for (let i in obj ) {
        arr.push(i);
      }
      return arr;
    }

    return (
      <div>
        <div className={styles.block}
        onClick={(e) => this.click(e)}
        >
          <div className={styles.upBlock}>
            <ImgView
            className={styles.heroIcon}
            src={this.hero.img}
            host={config.global.domain}
            />
            <div className={styles.leftInfo}>
              <div className={styles.leftInfoRow1}>
                <div className={styles.lvl}><div className={styles.levelLabel}>Lv.</div>{item.level}</div>
                <div className={type === 'rd' ? styles.nameRd : styles.nameDr}>
                  {item.personaname ? item.personaname : '匿名玩家'}
                </div>
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

          <div className={classNames({
            [styles.extensionHide]: true,
            [styles.extensionBlock]: item.player_slot === onSelect && this.state.toggle
          })}>
            <div className={styles.extTitleRow}>
              <div className={styles.extRowLeft}>
                <div className={styles.extInfo}>ID: {item.account_id ? item.account_id : '--(该玩家未开放数据)'}</div>
              </div>
              <div className={styles.rightItemImg}>
              {
                [item.backpack_0, item.backpack_1, item.backpack_2
                ].map((id, i) => {
                  if (id === 0) {
                    return (
                      <ImgView
                      className={styles.itemBackpack}
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
            <div className={styles.dataBlockRow}>
              {DataListItem('伤害', item.hero_damage)}
              {DataListItem('GPM', item.gold_per_min)}
              {DataListItem('XPM', item.xp_per_min)}
              {DataListItem('建筑伤害', item.tower_damage)}
              {DataListItem('正补', item.last_hits)}
              {DataListItem('反补', item.denies)}
              {DataListItem('治疗', item.hero_healing)}
            </div>
            <div className={styles.dataBlockRow}>
              {
                item.ability_upgrades_arr.map((id, i) => {
                  const src = abilityDict[abilitiesIds[id]].img
                  return (
                    src === undefined ? (
                      <ImgView
                      className={styles.ability}
                      src={config.img.abilityTree}
                      key={item.account_id + i + Math.random()*100}
                      children={
                        <div className={styles.ablityLvl}>
                          {i + 1}
                        </div>
                      }
                      />
                    ) : (
                      <ImgView
                      className={styles.ability}
                      src={src}
                      host={config.global.domain}
                      key={item.account_id + i + Math.random()*100}
                      children={
                        <div className={styles.ablityLvl}>
                          {i + 1}
                        </div>
                      }
                      />
                    )
                  )
                })
              }
            </div>
            {
              providePro ? (
                <div className={styles.professionBlock}>
                  <div className={styles.professionTitle}>进阶数据</div>
                  <div className={styles.dataBlockRow}>
                    {DataListItem('线优', item.lane_efficiency_pct)}
                    {DataListItem('分路', getLanePos(item.lane, item.isRadiant))}
                    {DataListItem('连续击杀', getMostKill(item.multi_kills))}
                    {DataListItem('刷野', item.neutral_kills)}
                    {DataListItem('APM', item.actions_per_min)}
                    {DataListItem('刷远古', item.ancient_kills)}
                    {DataListItem('买活次数', item.buyback_count)}
                    {DataListItem('拉野次数', item.camps_stacked)}
                    {DataListItem('杀鸡', item.courier_kills)}
                    {DataListItem('插假眼', item.obs_placed)}
                    {DataListItem('反假眼', item.observer_kills)}
                    {DataListItem('插真眼', item.sen_placed)}
                    {DataListItem('反真眼', item.sentry_kills)}
                    {DataListItem('全场控制', item.stuns)}
                    {DataListItem('吃赏金符', item.runes[5])}
                  </div>
                  <div className={styles.professionTitle}>技能使用</div>
                  <div className={styles.dataBlockRow}>
                    {
                      giveArray(item.ability_uses).map((id, i) => {
                        const src = abilityDict[id].img
                        return (
                          <div className={styles.abilityUse}
                          key={item.account_id + i + Math.random()*100}>
                            <ImgView
                            className={styles.ability}
                            src={src}
                            host={config.global.domain}
                            />
                            <div className={styles.desc}>{item.ability_uses[id] + '次'}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              ) : null
            }
          </div>
          
        </div>
      </div>
    )
  }
}


export default PlayerDetail;