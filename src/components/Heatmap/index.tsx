import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import ImgView from '../ImgView';
// import history from '../../history';
import Toast from '../Toast';
import * as classNames from 'classnames';
import * as Hmap from 'heatmap.js';


interface Props {
  points:{}[];
  width: number;
  name: string;
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

const drawHeatmap = ({
  points = [],
  width,
}, heatmap) => {
  // scale points by width/127 units to fit to size of map
  // offset points by 25 units to increase visibility
  const adjustedData = scaleAndExtrema(points, width / 127, null, 25);
  heatmap.setData(adjustedData);
};


class Heatmap extends React.Component <Props> {
  
  constructor(props: Props) {
    super(props);

  }

  public heatmap: Hmap.Heatmap<'value','x','y'>;

  componentDidMount() {
    this.heatmap = Hmap.create({
      container: this.refs[this.props.name] as HTMLElement,
      radius: 15 * (this.props.width / 600),
    });
    drawHeatmap(this.props, this.heatmap);
  }
  componentDidUpdate() {
    drawHeatmap(this.props, this.heatmap);
  }

  
  public render(): JSX.Element {

    return (
      <div className={styles.mapFrame}
      ref={this.props.name}
      style={{
        width: this.props.width,
        height: this.props.width,
      }}
      >
        <div className={styles.heatmap}>
          <img
            className={styles.map}
            style={{
              width: this.props.width,
              height: this.props.width,
            }}
            src={config.img.minimap}
          />
        </div>
      </div>
    )
  }
}

export default Heatmap;