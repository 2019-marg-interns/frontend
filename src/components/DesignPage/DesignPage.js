import React from 'react';
import {connect} from 'react-redux';
import {fabric} from 'fabric';
//import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
//import fs from 'fs';

import { toSaveDesign, changeUrl, toResetDesign } from '../../actions';
//import GroupDesignList from '../GroupPage/GroupDesignList.js';

// import humanhead image
const img = require.context('./',true);
const imgpath = (name) => img(name,true);
var img2 = new Image();
img2.src = imgpath("./humanhead.png");

//import wav files: named as number.wav
const wav = require.context('./wav',true,/\.wav$/);
const wavPath = (name) => wav(name,true);
var i = 1;
var path = './' + i + '.wav';
var count = 0;

//set total number of audio files
const num = 574;



    
class DesignPage extends React.Component {
    constructor(props){
        console.log("DesignPage - constructor")
        super(props);

        this.state = {
            //index: this.props.now_design.index,
            //value: this.props.now_design.design,
            //value: 0,
            value: [],
        };

        this.selectHandler = this.selectHandler.bind(this);
        this.setValue = this.setValue.bind(this);
        this.clickedSubmit = this.clickedSubmit.bind(this);
        this.clickedLoggedOutSubmit = this.clickedLoggedOutSubmit.bind(this);
        //this.resetDesignCheck = this.resetDesignCheck.bind(this);
    }

    componentWillMount() {
        console.log("DesignPage - componentWillMount")
    }

    componentDidMount() {
        console.log("DesignPage - componentDidMount")

        //add blank canvas 
        this.the_canvas = new fabric.Canvas('canvas', {
                                                lockMovementX: true,
                                                lockMovementY: true,
                                                selectable: false,
                                                  //preserveObjectStacking: true,
                                                  height:400,
                                                  width:400,
                                                  });

        //make it mouse sensitive
        this.the_canvas.on({
                            'mouse:up': this.selectHandler,
                            });

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

        //add human head 
        var humanhead = new fabric.Image(img2, {
            lockMovementX: true,
            lockMovementY: true,
            selectable: false,
            left: 206,
            top: 190,
            originX: 'center',
            originY: 'center',
            scaleX: 0.4,
            scaleY: 0.4,
        })
        this.the_canvas.add(humanhead)
        

       
        //add 18 buttons
        this.button = new Array(18);

        for (var i =0; i < 18; i++) {
            this.button[i] = new fabric.Circle({
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
                left: 200 + 150 * Math.sin(i*Math.PI/9),
                top: 200 - 150 * Math.cos(i*Math.PI/9),
                fill: 'red',
                radius: 8,
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
        
        //this.the_canvas.renderAll();
        //this.forceUpdate();

        //this.text;
          
    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    // componentWillUpdate (nextProps, nextState) {
        
    // }

    // componentDidUpdate(nextProps, nextState) {
      
    // }

    selectHandler = (e) =>{

        //console.log("select: ", selectedObject)

        let selectedObject = e.target;
        if(selectedObject === null){}
        else if(selectedObject.fill === 'red'){
            for(var j = 0; j < 18; j++){
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
        count = 0;
        for(var j = 0; j<19; j++){
            count = j;
            if(j===18) break;
            else if(this.button[j].fill==='blue') break;
        }
        
        //push values to this.state.value array
        //this.state.value.push(count);
        //console.log(this.state.value);
        
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
            case 1 : this.text = new fabric.Text('20', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 2 : this.text = new fabric.Text('40', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 3 : this.text = new fabric.Text('60', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 4 : this.text = new fabric.Text('80', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 5 : this.text = new fabric.Text('100', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 6 : this.text = new fabric.Text('120', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 7 : this.text = new fabric.Text('140', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 8 : this.text = new fabric.Text('160', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 9 : this.text = new fabric.Text('180', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 10 : this.text = new fabric.Text('200', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 11 : this.text = new fabric.Text('220', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 12 : this.text = new fabric.Text('240', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 13 : this.text = new fabric.Text('260', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 14 : this.text = new fabric.Text('280', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 15 : this.text = new fabric.Text('300', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 16 : this.text = new fabric.Text('320', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(this.text)
                break;
            case 17 : this.text = new fabric.Text('340', {
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
        //console.log(value);
        //this.setState({value: value});
    }     

    resetDesignCheck = (e) => {
        this.the_canvas.remove(this.text);
        for(var j = 0; j < 18; j++){
            this.button[j].set({
                fill: 'red',
            });
        }
        this.the_canvas.renderAll();
    }

    clickedNext = (e) => {
        this.state.value.push(count*20);
        console.log(this.state.value);
        //this.props.onSave(this.state.value);
        //window.alert("submitted");
        i = this.state.value.length + 1;
        path = './' + i + '.wav';
        this.resetDesignCheck();
        this.forceUpdate();
    }
    
    clickedLoggedOutSubmit = () => {
        window.alert("in order to submit, you must log in");
    }

    clickedSubmit = (e) => {
       this.state.value.push(count*20);
       console.log(this.state.value);
       this.props.onSave(this.state.value);
       window.alert("submitted!");
    }


    render() {
        return (
                <section className="wrap clear col3">

                {/*<!--========================================
                  LEFT SIDE BAR
                  =========================================-->*/}
                <div className="aside">
                <h2 className="h_white">AUDIO</h2>
                <div className="content">
                
                <audio
                    controls
                    src={wavPath(path)} >
                        Your browser does not support the
                        <code>audio</code> element.
                </audio>

                </div>
                </div>


                {/*<!--========================================
                  CENTER DESIGN SECTION
                  =========================================-->*/}
                <div className="main">
                <h2 className="h_white">DIRECTION CHECK</h2>
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
                {/*<button onClick = {this.clickedSubmit}>Submit</button>*/}
                
                {/*<!--========================================
                  NEW & SAVE Button Section
                  =========================================-->*/}
                {this.props.isLoggedIn?
                // 로그인되어 있는 경우 - new(새로운 디자인 시작), save(현재 디자인 유저 그룹에 저장)
                (<div>
                 <button className="button rst_btn" type="button" onClick={this.resetDesignCheck}>RESET</button>
                 {i == num ?
                 (
                     <button className="button save_btn" type="button" onClick={this.clickedSubmit}>SUBMIT</button>
                 )
                : <button className="button save_btn" type="button" onClick={this.clickedNext}>NEXT</button>
                }
                 
                 </div>)
                // 로그인되어 있지 않은 경우 
                : <div>
                <button className="button rst_btn" type="button" onClick={() => this.resetDesignCheck}>RESET</button>
                <button className="button save_btn" type="button" onClick={this.clickedLoggedOutSubmit}>NEXT</button>
                </div>
                }

                </div>
                </div>
                </div>

                {/*<!--========================================
                  RIGHT SIDE BAR
                  =========================================-->*/}
                <div className="aside">
                <h2 className="h_black">PROGRESS</h2>
                <div className="content">
                
                <font size="10">{i}/{num}</font>
                
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
    //now_design: state.now_design,

})

const mapDispatchToProps = (dispatch) => ({
    onClickLogin: () => dispatch(changeUrl('/log_in/')),
    onClickJoin: () => dispatch(changeUrl('/sign_up/')),
    onSave: (designid, design) => dispatch(toSaveDesign(designid, design)),
    //onReset: () => dispatch(toResetDesign()),
    //receives action onClickLogin and onClickJoin through props
})

export default connect (mapStateToProps, mapDispatchToProps)(DesignPage)
