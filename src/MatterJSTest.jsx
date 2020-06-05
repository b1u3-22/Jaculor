import React from "react";
import Matter from "matter-js";
import Platform from "./Parts/Platform";
import Barrier from "./Parts/Barrier";
import Player from "./Parts/Player";
import './SceneStyle.scss';
import "matter-wrap";
import Form from './Components/Form/Form';

Matter.use(
  'matter-wrap' // PLUGIN_NAME
);

let player_functional = new Player(0, 0);
let platforms = [];
let barriers = [];
let load = false;
let actual_score = 0;

function refreshPage() {
  window.location.reload(false);
}

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {charges: player_functional.charges, dashes: player_functional.dashes, score: actual_score, style_gameover: {display: 'none'}, style_form: {display: 'block'}, gameover_text: "Your score is: "};
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getStateOfPlayer(player_charges, player_dashes) {
    this.setState({charges: player_charges, dashes: player_dashes})
  }

  componentDidMount() {
    let Engine          = Matter.Engine,
        Render          = Matter.Render,
        World           = Matter.World,
        Body            = Matter.Body,
        Vector          = Matter.Vector,
        Bodies          = Matter.Bodies,
        Composite       = Matter.Composite,
        Query           = Matter.Query,
        width           = document.documentElement.clientWidth,
        height          = document.documentElement.clientHeight -100

    let engine = Engine.create({
      // positionIterations: 20
    });

    let render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false
      }
    });

    let generateLevel = function(dif_plat, dif_barr) {

      switch(this.Form.state.option0){
        case 0:
          let y = width / 5;
          break;
        case 1: 
          let y = width / 4;
          break;

        case 2: 
          let y = width / 3;
          break;

        case 3:
          let y = width / 2;
          break;

        defult: 
          let y = width / 4;
          break
      }

      for (let i = 0; i <= width; i += y){
        platforms.unshift(new Platform(i, this.getRandomInt(height), this.getRandomInt(6)))
        World.add(engine.world, platforms[0])
      }

      switch(this.Form.state.option1){
        case 3:
          let y = width / 5;
          break;
        case 2: 
          let y = width / 4;
          break;

        case 1: 
          let y = width / 3;
          break;

        case 0:
          let y = width / 2;
          break;

        defult: 
          let y = width / 4;
          break
      }

      for (let i = 200; i <= width -200; i += y){
        barriers.unshift(new Barrier(i, this.getRandomInt(height), this.getRandomInt(3)))

        World.add(engine.world, barriers[0])
      }

    }.bind(this)

    let resetLevel = function() {
      for (let i = platforms.length - 1; i >= 0; i--){
        for (let u = platforms[i].length - 1; u >= 0; u--){
          Composite.remove(engine.world, platforms[i][u])
        } 
        platforms.pop()
      }

      for (let i = barriers.length - 1; i >= 0; i--){
        for (let u = barriers[i].length - 1; u >= 0; u--){
          Composite.remove(engine.world, barriers[i][u])
        } 
        barriers.pop()
      }
    }

        
    let player_dummy = Bodies.circle(40, 0, 40, {
      plugin: {
        wrap: {
          min: {
            x: 0,
            y: 0
          },
          max: {
            x: width - 20,
            y: height
          }
        }
      }
    })

    this.CheckInterval = setInterval(() => {
      if (this.Form.state.clicked){
        this.setState({style_form: {display: 'none'}})
        generateLevel(this.Form.state.option0, this.Form.state.option1)
        console.log(this.Form.state)
        World.add(engine.world, player_dummy)
        clearInterval(this.CheckInterval);
        }
      }, 
    10)

    document.onkeydown = function(e) {
      switch (e.keyCode) {
          case 37:
            if (player_functional.useDashLeft()){
                Body.applyForce(player_dummy, Vector.create(player_dummy.x, player_dummy.y), Vector.create(-0.2, 0))
                break;
              }else{
                break;
              }
          case 38:
            if (player_functional.useCharge()){
              Body.applyForce(player_dummy, Vector.create(player_dummy.x, player_dummy.y), Vector.create(0, -0.2))
              player_dummy.torque = 0;
              break;
            }else{
              break;}
          case 39:
            if (player_functional.useDashRight()){
              Body.applyForce(player_dummy, Vector.create(player_dummy.x, player_dummy.y), Vector.create(0.2, 0))
              break;
            }else{
              break;
            }
          default:     
      }

  }

    Engine.run(engine);
    Render.run(render);

    this.GameInterval = setInterval(() => {
      this.setState({charges: player_functional.charges, dashes: player_functional.dashes});

      if (player_dummy.position.x < width/2 + 20 && player_dummy.position.x > width/2 - 20){
        load = true;
      }

      if (player_dummy.position.x > width && load === true){
          resetLevel()
          generateLevel(this.Form.state.option0, this.Form.state.option1)
          load = false;
          actual_score += 1
          this.setState({score: actual_score})
        }
      
      if (player_dummy.position.y > height){
        Composite.remove(engine.world, player_dummy)

        if (this.Form.state.nickname != ""){
          this.setState({gameover_text: this.Form.state.nickname + ", your score is:"})
        }

        this.setState({style_gameover: {display: 'block'}})
        }

      for (let i = 0; i < barriers.length; i++){
        if (Query.collides(player_dummy, barriers[i]).length !== 0){
          Composite.remove(engine.world, player_dummy)

          if (this.Form.state.nickname != ""){
            this.setState({gameover_text: this.Form.state.nickname + ", your score is:"})
          }
          
          this.setState({style_gameover: {display: 'block'}})
          }
        }
      }, 
    10);
  }
  render() {
    return (
      <>
        <div ref="scene" className = "Scene" />
        <div className = "OverlayWrapper" style = {this.state.style_gameover}>
          <h1 className = "Title">Gameover</h1>
          <p className = "Label">{this.state.gameover_text}</p>
          <p className = "Score">{this.state.score}</p>
          <p className = "Button" onClick={refreshPage}>Try again</p>
        </div>
        <div className="OverlayWrapper" style = {this.state.style_form} >
          <Form ref = {(Form) => {this.Form = Form}}/>
        </div>
        <div className = "TrayWrapper">
          <div className = "Tray">
          <div className = "TextWrapper">
              <p className = "Number">{this.state.charges}</p>
              <p className = "Explanation">Jumps</p>
            </div>
          </div>
          <div className = "Tray">
            <div className = "TextWrapper">
              <p className = "Number">{this.state.dashes}</p>
              <p className = "Explanation">Dashes</p>
            </div>
          </div>
          <div className = "Tray">
            <div className = "TextWrapper">
              <p className = "Number">{this.state.score}</p>
              <p className = "Explanation">Score</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Scene;