
import * as React from 'react';

class Red extends React.Component<IAppProps,IAppState>{

  public render(): JSX.Element {
      return(
        <div className={'hehe'}>
          <div className={'red'}>
            red
          </div>
        </div>
      )
    }
  }

  export default Red;