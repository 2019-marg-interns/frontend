import React from 'react';
import {connect} from 'react-redux';
import {fabric} from 'fabric';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { changeUrl } from '../../actions';




class DesignPage extends React.Component {
    constructor(props){
        console.log("DesignPage - constructor")
        super(props);

        this.state = {
            value: 0
        };

        this.selectHandler = this.selectHandler.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    componentWillMount() {
        console.log("DesignPage - componentWillMount")
    }

    componentDidMount() {
        console.log("DesignPage - componentDidMount")

        //add blank canvas 
        this.the_canvas = new fabric.Canvas('canvas', {
                                                  preserveObjectStacking: true,
                                                  height:400,
                                                  width:400,
                                                  });

        //make it mouse sensitive
        this.the_canvas.on({
                            'mouse:up': this.selectHandler,
                            });

        //add human head 
        var img = new Image();
        img.src = "https://i.ibb.co/bXsRWB6/2019-07-11-2-59-59.png";
        console.log(img);
        var humanhead = new fabric.Image(img, {
            left: 206,
            top: 200,
            originX: 'center',
            originY: 'center',
            scaleX: 0.4,
            scaleY: 0.4,
        })
        this.the_canvas.add(humanhead);     

        //add circle
        var circle = new fabric.Circle({
            lockMovementX: true,
            lockMovementY: true,
            selectable: false,
            left: 200,
            top: 200,
            fill: "",
            radius: 150,
            hasControls: false, 
            selection: false,
            hasRoatatingPoint: false,
            stroke: 'red',
            strokeWidth: 1,
            originX: 'center',
            originY: 'center',
        })
        this.the_canvas.add(circle)

       
          //add 12 buttons
           this.button = new Array(12);

          for (var i =0; i < 12; i++) {
              this.button[i] = new fabric.Circle({
                  lockMovementX: true,
                  lockMovementY: true,
                  selectable: false,
                  left: 200 + 150 * Math.sin(i*Math.PI/6),
                  top: 200 - 150 * Math.cos(i*Math.PI/6),
                  fill: 'red',
                  radius: 10,
                  hasControls: false,
                  selection: false,
                  hasRoatatingPoint: false,
                  stroke: 'red',
                  strokeWidth: 1,
                  originX: 'center',
                  originY: 'center',
              })
              this.the_canvas.add(this.button[i])
          }

          this.text;
          
    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    // componentWillUpdate (nextProps, nextState) {
        
    // }

    // componentDidUpdate(nextProps, nextState) {
      
    // }

    selectHandler = (e) =>{

        console.log("select: ", selectedObject)

        let selectedObject = e.target;
        if(selectedObject.fill === 'red'){
            for(const j = 0; j < 12; j++){
                this.button[j].set({
                    fill: 'red',
                });
            }
            selectedObject.set({
                fill: 'blue',
            });
        } 
        else if(selectedObject.fill === 'blue'){
            selectedObject.set({
                fill: 'red',
            });
        }
        let count = 0;
        for(const j = 0; j<13; j++){
            count = j;
            if(j===12) break;
            else if(this.button[j].fill==='blue') break;
        }
        
        
        this.the_canvas.remove(this.text)
        switch (count) {
            case 0 : this.text = new fabric.Text('0', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 1 : this.text = new fabric.Text('30', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 2 : this.text = new fabric.Text('60', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 3 : this.text = new fabric.Text('90', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 4 : this.text = new fabric.Text('120', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 5 : this.text = new fabric.Text('150', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 6 : this.text = new fabric.Text('180', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 7 : this.text = new fabric.Text('210', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 8 : this.text = new fabric.Text('240', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 9 : this.text = new fabric.Text('270', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 10 : this.text = new fabric.Text('300', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 11 : this.text = new fabric.Text('330', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
        }
        this.the_canvas.renderAll();
    }

    
    setValue = (value) => {
        console.log(value);
        this.setState({value: value});
    }     

    clickedSubmit = (e) => {
        window.alert("submitted");
    }

    render() {
        return (
                <section className="wrap clear col3">

                {/*<!--========================================
                  LEFT SIDE BAR
                  =========================================-->*/}
                <div className="aside">
                <h2 className="h_white">SELECT STYLE</h2>
                <div className="content">
                <audio controls>
                <source src="./1.wav" type="audio/wav"/>
                </audio>
                </div>
                </div>


                {/*<!--========================================
                  CENTER DESIGN SECTION
                  =========================================-->*/}
                <div className="main">
                <h2 className="h_white">SAMPLE VIEW</h2>
                <div className="content">

                {/*<!--========================================
                  Fabric Canvas Section
                  =========================================-->*/}
                {/*<RoundSlider/>*/}
                <div id="slider"></div>
                <div id="plain-react">
                <div classname="canvas-bg">
                <canvas id="canvas" />
                </div>
                <br/> 
                <br/>
                <button onClick = {this.clickedSubmit}>Submit</button>
                </div>
                </div>
                </div>

                {/*<!--========================================
                  RIGHT SIDE BAR
                  =========================================-->*/}
                <div className="aside">
                <h2 className="h_black">MY GROUP</h2>
                <div className="content">
               
                </div>
                </div>
                </section>
                );
    }
}

const mapStateToProps = (state) => ({
    //state authorization is passed as props in designpage 
    isLoggedIn: state.authorization,
    profile_user: state.profile_user,

})

const mapDispatchToProps = (dispatch) => ({
    onView: () => dispatch(changeUrl('/group/1')),
    onClickLogin: () => dispatch(changeUrl('/log_in/')),
    onClickJoin: () => dispatch(changeUrl('/sign_up/')),
    //receives action onClickLogin and onClickJoin through props
})

export default connect (mapStateToProps, mapDispatchToProps)(DesignPage)
