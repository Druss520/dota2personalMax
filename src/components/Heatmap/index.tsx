import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import ImgView from '../ImgView';
// import history from '../../history';
import Toast from '../Toast';
import * as classNames from 'classnames';
import * as h337 from 'heatmap.js';


interface Props {
  points:{}[];
  width: number;
  name: string;
  imgClick: (name: string) => void;
}

function scaleAndExtrema(points, scalef, max, shift) {
  const newPoints = points.map(p => ({
    x: Math.floor(p.x * scalef),
    y: Math.floor(p.y * scalef),
    value: p.value + (shift || 0),
  }));
  const vals = points.map(p => p.value);
  const localMax = Math.max.apply(null, vals);
  return {
    min: 0,
    max: max || localMax,
    data: newPoints,
  };
}


class Heatmap extends React.Component <Props> {
  
  constructor(props: Props) {
    super(props);

  }

  public heatmap: h337.Heatmap<"value", "x", "y"> = undefined;
  public id: string = this.props.name;

  componentDidMount() {
    this.heatmap = h337.create({
      container: document.getElementById(this.id),
      radius: 15 * (this.props.width / 600),
    });
    const adjustedData = scaleAndExtrema(this.props.points, this.props.width / 127, null, 25);
    // console.log(this.props.width, adjustedData, 1111111);
    this.heatmap.setData(adjustedData);
  }

  componentDidUpdate() {
    const adjustedData = scaleAndExtrema(this.props.points, this.props.width / 127, null, 25);
    // console.log(this.props.width, adjustedData, this.props,name);
    this.heatmap.setData(adjustedData);
  }

  
  public render(): JSX.Element {

    return (
      <div
      className={styles.mapFrame}
      id= {this.id}
      style={{
        width: this.props.width,
        height: this.props.width,
      }}
      onClick={() => this.props.imgClick(this.props.name)}
      >
        <img
          className={styles.map}
          style={{
            width: this.props.width,
            height: this.props.width,
          }}
          src={config.img.minimap}
        />
      </div>
    )
  }
}

export default Heatmap;