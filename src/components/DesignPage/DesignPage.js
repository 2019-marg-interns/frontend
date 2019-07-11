import React from 'react';
import {connect} from 'react-redux';
import {fabric} from 'fabric';
import 'react-confirm-alert/src/react-confirm-alert.css';


import MyGroupList from '../GroupPage/MyGroupList';
import FabricCanvas from './FabricCanvas';

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

         //add center
        //  var circle2 = new fabric.Circle({
        //     lockMovementX: true,
        //     lockMovementY: true,
        //     selectable: false,
        //     left: 200,
        //     top: 200,
        //     fill: 'red',
        //     radius: 10,
        //     hasControls: false, 
        //     selection: false,
        //     hasRoatatingPoint: false,
        //     stroke: 'red',
        //     strokeWidth: 1,
        //     originX: 'center',
        //     originY: 'center', 
        // })

        //this.the_canvas.add(circle2)

        //add line
        // var line = new fabric.Line([200,200, 200, 50], {
        //     fill: 'red',
        //     stroke: 'red',
        //     strokeWidth: 1,
        //     selectable: false,
        //     evented: false,
        //   });

        //   this.the_canvas.add(line)

          //add clicking button
          
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

          //add text
        //   var text = new fabric.Text('TEST', {
        //       fill: 'black',
        //       top: 360,
        //       left: 170,
        //       fontSize: 30
              
        //   })
        //   this.the_canvas.add(text)
          
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
        this.the_canvas.remove(text)
        switch (count) {
            case 0 : var text = new fabric.Text('0', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(text)
                break;
            case 1 : var text = new fabric.Text('30', {
                    fill: 'black',
                    top: 360,
                    left: 170,
                    fontSize: 30
                })
                this.the_canvas.add(text)
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
                {this.props.isLoggedIn? <MyGroupList /> : <center>로그인을 해주세요</center>}
                </div>
                </div>
                </section>
                );
    }
}

const mapStateToProps = (state) => ({
    //state authorization is passed as props in designpage 
    isLoggedIn: state.authorization,
    //profile_user: state.profile_user,

})

const mapDispatchToProps = (dispatch) => ({
    //onView: () => dispatch(changeUrl('/group/1'))
    //onClickLogin: () => dispatch(changeUrl('/log_in/')),
    //onClickJoin: () => dispatch(changeUrl('/sign_up/')),
    //receives action onClickLogin and onClickJoin through props
})

export default connect (mapStateToProps, mapDispatchToProps)(DesignPage)