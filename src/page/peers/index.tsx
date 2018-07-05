import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import player from '../../interface/player';
import StateView from '../../components/StateView';
import PeerItem from '../../components/peersItem';
import Dialog from '../../components/dialog';
import Toast from '../../components/Toast';
import ImgView from '../../components/ImgView';
import { Peers } from '../../interface/player';
import getPeers from '../../interface/player/getPeers';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

interface State {
  call1: boolean,
  fail: number,
  onCheck: boolean;
  checkList: {};
  toggleDialog: boolean;
  dialogreqState: number;
}


@observer class PeersClass extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);

    this.changeCheckState = this.changeCheckState.bind(this);
    this.openCheck = this.openCheck.bind(this);
    this.closeCheck = this.closeCheck.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleReqDialog = this.handleReqDialog.bind(this);
  }

  public state: State = {
    call1: false,
    fail: 0,
    onCheck: false,
    checkList: {},
    toggleDialog: false,
    dialogreqState: 0,
  }

  public idList: string[] = [];
  public pickList: Peers[] = []; 
  public kaihei: Peers[] = [];
  public tempid: string;

  public componentDidMount(): void {
    this.tempid = config.global.Global.accountId
    const prevAccountId = player.previousAccountId;
    if (this.tempid !== prevAccountId) {
      this.peerReq();
    } else {
      if (player.peers) {
        this.setState({
          call1: true
        })
      } else {
        this.peerReq();
      }
    }
  }

  public componentWillUnmount(): void {
    this.setState = () => {
      return;
    }
  }

  public peerReq(): void {
    player.PeerPage().then((value) => {
      if (value === 1) {
        this.setState({
          fail: 1
        })
      } else if (value === 2) {
        this.setState({
          fail: 2
        })
      } else {
        this.setState({
          call1: true
        })
      }
    })
  }

  @action public getPeerObj(id: string): Peers {
    let ret: Peers;
    const tempArray: Peers[] = player.peers.slice();
    for (let i=0; i<=tempArray.length; i++) {
      if (tempArray[i].account_id.toString() === id) {
        ret = player.peers[i];
        break;
      }
    }
    return ret;
  }

  public changeCheckState(Id: string): void {
    if (this.idList.length < 4) {
      const temp: any = this.state.checkList;
      const id = Id;
      temp[id] = temp[id] ? undefined : id;
      if (temp[id] === undefined) {
        const idx = this.idList.indexOf(id);
        this.idList.splice(idx, 1);
        this.pickList.splice(idx, 1);
      } else {
        this.idList.push(id);
        this.pickList.push(this.getPeerObj(id));
      }
      this.setState({
        checkList: temp
      });
    } else {
      const temp: any = this.state.checkList;
      const id = Id;
      if (temp[id]) {
        const idx = this.idList.indexOf(id);
        this.idList.splice(idx, 1);
        this.pickList.splice(idx, 1);
        temp[id] = undefined;
        this.setState({
          checkList: temp
        });
      }
    }
  }

  public async handleReqDialog(): Promise<void> {
    if (this.idList.length === 0) {
      Toast.show('请选择玩家',1,'fail');
    } else {
      this.setState({
        toggleDialog: true,
        onCheck: false,
        dialogreqState: 0
      })
      const id=parseInt(config.global.Global.accountId);
      let peerId: number[] = [];
      this.idList.forEach(e => {
        peerId.push(parseInt(e));
      })
      const params = Object.assign({}, {
        account_id: id,
        included_account_id: peerId
      })
      await getPeers(params).then((res) => {
        this.kaihei = res.data;
        if(this.kaihei.length === 0) {
          this.setState({
            dialogreqState: 9000
          })
        } else {
          this.setState({
            dialogreqState: 200
          })
        }
      }).catch(e => {
        console.log(e);
        this.setState({
          dialogreqState: 404
        })
      })
    }

  }

  public closeDialog(): void {
    this.setState({
      toggleDialog: false,
      checkList: {},
      dialogreqState: 0
    });
    this.idList = [];
    this.kaihei = [];
    this.pickList = [];
  }

  public openCheck(): void {
    this.setState({
      onCheck: true
    });
  }

  public closeCheck(): void {
    this.setState({
      onCheck: false,
      checkList: {},
    });
    this.idList = [];
    this.pickList = [];
  }

  public render(): JSX.Element {
      return(
        <div className={styles.page}>
          <div className={styles.header}>
            <div className={classNames([
              styles.back,
              'fa fa-chevron-left'
            ])}
            onClick={() => {
              history.goBack();
            }}
            >
            </div>
            诶？队友呢
          </div>
          {
          this.state.call1 ? (
            <div>
              {
                !this.state.onCheck ? (
                  <div className={styles.unselect}
                  onClick={() => this.openCheck()}
                  >
                  <div className={classNames([
                    'fa fa-user-plus',
                    styles.icon
                  ])}></div>
                  选择开黑队友
                  </div>
                ) : (
                  <div className={styles.unselect}
                  >
                    <div className={styles.left}
                    onClick={() => this.closeCheck()}
                    >
                      <div className={classNames([
                        'fa fa-remove',
                        styles.icon
                      ])}></div>
                      取消
                    </div>
                    <div className={styles.right}
                    onClick={() => this.handleReqDialog()}
                    >
                      <div className={classNames([
                        'fa fa-check',
                        styles.icon
                      ])}></div>
                      查询
                    </div>
                  </div>
                )
              }
              <div className={styles.title}>
                <div className={styles.tt1}>玩家(≤20人)</div>
                <div className={styles.tt2}>场数</div>
                <div className={styles.tt3}>胜率</div>
              </div>
                  {
                    player.peers.map((item, i) => {
                      return (
                        <PeerItem
                        key={i}
                        peer={item}
                        onCheck={this.state.onCheck}
                        onclick={this.changeCheckState}
                        checkState={this.state.checkList}
                        />
                      )
                    })
                  }
                <Dialog
                  dialogclose={this.closeDialog}
                  visible={this.state.toggleDialog}
                  children={
                    this.state.dialogreqState === 0 ? (
                      <div className={styles.loadingDialog}>
                        <div className={'fa fa-spinner fa-spin fa-3x'}></div>
                      </div>
                    ): (
                      this.state.dialogreqState === 200 ? (
                        <div className={styles.dialogContent}>
                          <div className={styles.dialogAvatarRow}>
                            {
                              this.pickList.map((item, i) => {
                                return (
                                  <ImgView
                                  className={styles.dialogAvatar}
                                  src={item.avatarfull}
                                  key={i}
                                  />
                                )
                              })
                            }
                          </div>
                          <div className={styles.dialogInfoRow}>
                            开黑<div className={styles.dialogInfoData}>{this.kaihei[0].with_games}</div>场, 胜率
                            <div className={styles.dialogInfoData}>{(this.kaihei[0].win/this.kaihei[0].with_games*100).toFixed(1)+'%'}</div>
                          </div>
                        </div>
                      ) : (
                        this.state.dialogreqState === 9000 ? (
                          <div className={styles.loadingDialog}>
                            <div className={'fa fa-meh-o fa-3x'}></div>无数据
                          </div>
                        ) : (
                          <div className={styles.loadingDialog}
                          onClick={() => this.handleReqDialog()}
                          >
                            <div className={'fa fa-refresh fa-3x'}></div>
                            加载失败，点击重载
                          </div>
                        )
                      )
                    )
                  }
                />
            </div>
            ) : this.state.fail === 1 ? (
              <StateView state={'fail'} />
            ) : (
              this.state.fail === 2 ? (
                <StateView state={'empty'} />
              ) : (
                <StateView state={'loading'} />
              )
            )
          }
        </div>
      )
    }
  }

  export default PeersClass;