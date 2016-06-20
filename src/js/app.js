import 'aframe';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

//This seems to work but through side effect...
import TextComponent from "aframe-text-component"

import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';

class SimpleVisualisationScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1.0, 2.0, 2.1, 0.4, 1.2, 3.4, 2.5],
      labels: ["A", "B", "C", "D", "E", "F", "G"],
        selection: null,
        detail: null
    }
  }

    setSelection(selection){
        this.setState({selection})
    }

    clearSelection(){
        this.setState({selection: null})
    }

    setDetail(selection){
        this.setState({detail: selection})
    }

    coordsToPosition(coords){
        return `${coords.x} ${coords.y} ${coords.z}`
    }

  renderValue(idx, d){
      const length = this.state.data.length;

      const coords = {
          x: 15.0* idx/length - 7.5,
          y: d/2 - 2,
          z: -2
      };

      const textCoords = {
          x: 15.0* idx/length - 7.75,
          y: -3,
          z: -2
      };

      const startCoords = {
          x: 15.0* idx/length - 7.5,
          y: -2,
          z: -2
      };

      return (
          [
          <Entity geometry={`primitive: box; width:2; height: ${d}; depth: 0.1;`}
                  material={ this.state.selection == idx? {color: "white"} :{color: "orange"}}
                  position={this.coordsToPosition(coords)}
                  onMouseEnter={() => this.setSelection(idx)}
                  onMouseLeave={() => this.clearSelection(idx)}
                  onClick={()=> this.setDetail(idx)}
          >
              <Animation attribute="scale" dur="5000"from ="1 0 1" to="1 1 1"/>
              <Animation attribute="position" dur="5000" from ={this.coordsToPosition(startCoords)} to={this.coordsToPosition(coords)}/>
          </Entity>,
          <Entity text={"text: " + this.state.labels[idx]}
                  material={ this.state.selection == idx? {color: "white"} :{color: "orange"}}
                  position={this.coordsToPosition(textCoords)}/>
        ]
    )
  }

  renderDetail(){
      if(this.state.detail){
          const d = this.state.data[this.state.detail];
          const l = this.state.labels[this.state.detail];
          const coords = {
            x: 0,
            y: 4*d/2 - 2,
            z: -6
          };

          const textCoords = {
              x: -0.5,
              y: -5,
              z: -6
          };

          return (
            [<Entity geometry={`primitive: box; width:4; height: ${4*d}; depth: 0.1;`}
                    material={{color: "white"}}
                    position={this.coordsToPosition(coords)}
                    onClick={()=> this.setDetail(null)} />,
                <Entity text={"text: " + this.state.labels[this.state.detail]}
                        material={{color: "white"}}
                        position={this.coordsToPosition(textCoords)}
                        scale="3 3 1"
                />
                ]
          );
      } else {
          return "";
      }
  }

  render () {
    return (
      <Scene>
        <Camera><Cursor/></Camera>

        <Sky/>

          {this.state.data.map((data, i) => this.renderValue(i, data))}
          {this.renderDetail()}

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
        <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>
      </Scene>
    );
  }
}

ReactDOM.render(<SimpleVisualisationScene/>, document.querySelector('.scene-container'));
