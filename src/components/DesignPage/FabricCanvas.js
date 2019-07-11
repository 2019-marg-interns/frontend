import React from 'react';
import {fabric} from 'fabric';
//import './App.css';

class FabricCanvas extends React.Component{

    constructor(props) {
        super(props);
        console.log("FabricCanvas - constructor - props: ", props)
        this.state = {
            pictures : [],
            front_property : null,
            back_property: null
        };
        this.onDrop = this.onDrop.bind(this);
        this.designElementToImage = this.designElementToImage.bind(this);
        this.updateFrontCanvasforImage = this.updateFrontCanvasforImage.bind(this);
        this.updateBackCanvasforImage = this.updateBackCanvasforImage.bind(this);

        this.logoElementToImage = this.logoElementToImage.bind(this);

        this.design_element = ["body", "sleeve", "stripe", "banding", "button"]

        this.text_element = ["frontchest", "leftarm", "rightarm", "upperback", "middleback", "lowerback"]
        this.logo_element = ["frontchest", "leftarm", "rightarm", "upperback", "middleback", "lowerback"]

    }
    /*I do not know why but setting either of willupdate or didupdate works*/
    componentWillUpdate(nextProps, nextState) {
        this.the_front_canvas.renderAll();
        this.the_back_canvas.renderAll();
    }

    // componentDidUpdate(nextProps, nextState) {
    //     this.the_front_canvas.renderAll();
    //     this.the_back_canvas.renderAll();
    // }
    componentWillMount() {

    }
    componentDidMount() {
        console.log("FabricCanvas - componentDidMount")

        this.the_front_canvas = new fabric.Canvas('front-canvas', {
            preserveObjectStacking: true,
            height:460,
            width:430,
        });

        this.the_back_canvas = new fabric.Canvas('back-canvas', {
            preserveObjectStacking: true,
            height:460,
            width:430,
        });

        this.the_front_canvas.add(this.designElementToImage(this.props.design.body, "front_body", 0))
        this.the_back_canvas.add(this.designElementToImage(this.props.design.body, "back_body", 0))
        this.the_front_canvas.add(this.designElementToImage(this.props.design.sleeve, "front_sleeve", 0))
        this.the_back_canvas.add(this.designElementToImage(this.props.design.sleeve, "back_sleeve", 0))
        this.the_front_canvas.add(this.designElementToImage(this.props.design.banding, "front_banding", 0))
        this.the_back_canvas.add(this.designElementToImage(this.props.design.banding, "back_banding", 0))
        this.the_front_canvas.add(this.designElementToImage(this.props.design.stripe, "front_stripe", 2))
        this.the_back_canvas.add(this.designElementToImage(this.props.design.stripe, "back_stripe", 2))
        this.the_front_canvas.add(this.designElementToImage(this.props.design.button, "front_button", 2))

        this.the_front_canvas.add(this.textElementToImage(this.props.text.frontchest, "frontchest"))
        this.the_front_canvas.add(this.textElementToImage(this.props.text.rightarm, "rightarm"))
        this.the_back_canvas.add(this.textElementToImage(this.props.text.upperback, "upperback"))
        this.the_back_canvas.add(this.textElementToImage(this.props.text.middleback, "middleback"))
        this.the_back_canvas.add(this.textElementToImage(this.props.text.lowerback, "lowerback"))
        // console.log("the_front_canvas: ", this.the_front_canvas);
        //this.the_front_canvas.renderAll();
        //this.the_back_canvas.renderAll();

    }

    designElementToImage(color, type, z_Index) {
        console.log("FabricCanvas - designElementToImage - color: ", color, "type: ", type)

        var imgElement = document.createElement("img");
        var src = './images/templates/' + type + '/' + type + color.substring(1)+'.png';


        // console.log("src: ", src)

		imgElement.setAttribute("src", require(src));

		var imgInstance = new fabric.Image(imgElement, {
			width: 430,
			height: 460,
			the_type: type                                                         ,
			zIndex: z_Index
		});

        // console.log("imgInstance: ", imgInstance)
        return imgInstance
    }

    logoElementToImage(img, type) {
        console.log("FabricCanvas - textElementToImage")
        let imgInstance;
        switch(type) {
        case "frontchest":
            imgInstance = new fabric.Image(img, {
                width: 899,
                height:959,
                zIndex: 10,
                left: 450,
                top: 110
            });
            imgInstance.set({
                scaleY: 0.1,
                scaleX: 0.1,
                originX: "center",
                originY: "center"
                });
            break;

        case "leftarm":
            imgInstance = new fabric.Image(img, {
                width: 899,
                height:959,
                zIndex: 10,
                left: 250,
                top: 110
            });
            break;
        case "rightarm":
            imgInstance = new fabric.Image(img, {
                width: 899,
                height:959,
                zIndex: 10,
                left: 50,
                top: 110
            });
            imgInstance.set({
                scaleY: 0.1,
                scaleX: 0.1,
                originX: "center",
                originY: "center"
            });
            break;
        case "upperback":
            imgInstance = new fabric.Image(img, {
            width: 899,
            height:959,
            zIndex: 10,
            left: 450,
            top: 110
         });
            imgInstance.set({
            scaleY: 0.2,
            scaleX: 0.2,
            originX: "center",
            originY: "center"
            });
            break;
        case "middleback":
            imgInstance = new fabric.Image(img, {
            width: 899,
            height:959,
            zIndex: 10,
            left: 450,
            top: 450
            });
             imgInstance.set({
            scaleY: 0.2,
            scaleX: 0.2,
            originX: "center",
            originY: "center"
            });
            break;
        case "lowerback":
            imgInstance = new fabric.Image(img, {
            width: 899,
            height:959,
            zIndex: 10,
            left: 450,
            top: 600
            });
            imgInstance.set({
            scaleY: 0.2,
            scaleX: 0.2,
            originX: "center",
            originY: "center"
            });
            break;
        default:
            break;
        }

        console.log("text imgInstance: ", imgInstance)
        return imgInstance
    }

    textElementToImage(text, type) {
        console.log("FabricCanvas - logoElementToImage")
        let imgInstance;
        switch(type) {
        case "frontchest":
            imgInstance = new fabric.IText(text.textvalue, {
                fontFamily: text.fontFamily,
                fill: text.fill,
                fontStyle: text.fontStyle,
                fontSize: text.fontSize,
                the_type: type,
                zIndex: 10,
                left: text.left,
                top: text.top,
                textAlign: "center"
            })
            break;
        case "rightarm":
            imgInstance = new fabric.IText(text.textvalue, {
                fontFamily: text.fontFamily,
                fill: text.fill,
                fontStyle: text.fontStyle,
                fontSize: text.fontSize,
                the_type: type,
                zIndex: 10,
                left: 50,
                top: 120,
                textAlign: "center"
            })
            break;
        case "upperback":
            imgInstance = new fabric.IText(text.textvalue, {
                fontFamily: text.fontFamily,
                fill: text.fill,
                fontStyle: text.fontStyle,
                fontSize: text.fontSize,
                the_type: type,
                zIndex: 10,
                left: 140,
                top: 120,
                textAlign: "center"
            })
            break;
        case "middleback":
            imgInstance = new fabric.IText(text.textvalue, {
                fontFamily: text.fontFamily,
                fill: text.fill,
                fontStyle: text.fontStyle,
                fontSize: text.fontSize,
                the_type: type,
                zIndex: 10,
                left: 160,
                top: 145,
                textAlign: "center"
            })
            break;
        case "lowerback":
            imgInstance = new fabric.IText(text.textvalue, {
                fontFamily: text.fontFamily,
                fill: text.fill,
                fontStyle: text.fontStyle,
                fontSize: text.fontSize,
                the_type: type,
                zIndex: 10,
                // left: 120,
                // top: 170,
                textAlign: "center"
            })
            break;
        default:
            break;

        }
        console.log("text imgInstance: ", imgInstance);
        return imgInstance;

    }


    componentWillReceiveProps(newprops) {
        console.log("FabricCanvas - componentWillReceiveProps newprops: ", newprops)

        // If Updated Item is not the same as the old one
        //         => Update the canvas with newer item
        for(let element of this.design_element){
            if(newprops.design[element] !== this.props.design[element]) {
                if(element === "stripe" ) {
                    this.updateFrontCanvasforImage(this.designElementToImage(newprops.design[element], 'front_'+element, 2))
                    this.updateBackCanvasforImage(this.designElementToImage(newprops.design[element], 'back_'+element, 2))
                }
                else if (element === "button") {
                    this.updateFrontCanvasforImage(this.designElementToImage(newprops.design[element], 'front_'+element, 2))
                }
                else {
                    this.updateFrontCanvasforImage(this.designElementToImage(newprops.design[element], 'front_'+element, 0))
                    this.updateBackCanvasforImage(this.designElementToImage(newprops.design[element], 'back_'+element, 0))
                    //this.forceUpdate();
                    //console.log("force update");

                }
            }
        }


        for(let element of this.text_element){
            if(newprops.text[element] !== this.props.text[element]) {
                switch(element) {
                case "frontchest":
                    this.updateFrontCanvasforImage(this.textElementToImage(newprops.text.frontchest, "frontchest"))
                    break;
                case "rightarm":
                this.updateFrontCanvasforImage(this.textElementToImage(newprops.text.rightarm, "rightarm"))
                    break;
                case "upperback":
                this.updateBackCanvasforImage(this.textElementToImage(newprops.text.upperback, "upperback"))
                    break;
                case "middleback":
                this.updateBackCanvasforImage(this.textElementToImage(newprops.text.middleback, "middleback"))
                    break;
                case "lowerback":
                this.updateBackCanvasforImage(this.textElementToImage(newprops.text.lowerback, "lowerback"))
                    break;
                default:
                    break;
                }
            }
        }

    }

    updateFrontCanvasforImage (next) {
        console.log("FabricCanvas - updateFrontCanvasForImage next: ", next)

        if(next){

            let to_remove;
            // Find the same kind of element
            this.the_front_canvas.forEachObject( (object) => {

                if(object.the_type === next.the_type){
                    console.log("obcject.the_type: ", object.the_type, " next.the_type: ", next.the_type)
                    to_remove = object;
                    this.the_front_canvas.remove(to_remove);
                }
            } );

            //this.the_front_canvas.remove(to_remove);
            // console.log("remove front canvas");
            //this.the_front_canvas.renderAll();

            // if(next.the_type === 'bg'){
            //     this.the_front_canvas.setBackgroundImage(next);
            //     this.the_front_canvas.renderAll();
            //     return;
            // }

            this.the_front_canvas.add(next);
            // console.log("add to front canvas");
            //this.the_front_canvas.requestRenderAll();

            this.the_front_canvas.moveTo(next, next.zIndex);
            this.the_front_canvas.renderAll();
            //this.forceUpdate();
            //console.log("rerender");
        }
    }

    updateBackCanvasforImage (next) {

        console.log("FabricCanvas - updateBackCanvasForImage")


        if(next){

            let to_remove;
            // Find the same kind of element
            this.the_back_canvas.forEachObject( (object) => {

                if(object.the_type === next.the_type){
                    to_remove = object;
                    this.the_back_canvas.remove(to_remove);
                }
            } );

            //this.the_back_canvas.remove(to_remove);
            //this.the_back_canvas.renderAll();


            // if(next.the_type === 'bg'){
            //     this.the_back_canvas.setBackgroundImage(next);
            //     this.the_back_canvas.renderAll();
            //     return;
            // }

            this.the_back_canvas.add(next);
            //this.the_back_canvas.renderAll();
            this.the_back_canvas.moveTo(next, next.zIndex);
            //this.the_back_canvas.renderAll();


        }
    }

    onDrop (e) {
        console.log("hey");

        e.preventDefault();
        var preview = document.getElementById('img');
        //var img = new Image(40, 40);
        var file = document.getElementById('input').files[0];
        var canvas = this.the_front_canvas;
        var canvas2 = this.the_back_canvas;
        let reader = new FileReader();
        reader.addEventListener("load", function() {
            preview.src = reader.result;
            //img.src = reader.result;
            /*var imgInstance = new fabric.Image(preview, {
            width: 40,
            height: 40,
            the_type: "upload",
            zIndex: 2
            });*/
            console.log(preview.width);
            console.log(preview.height);

            var imgInstance = new fabric.Image(preview, {
            width: 430,
            height:460,
            the_type: "upload",
            zIndex: 10
            });
            console.log("imgInstance set");
            imgInstance.set({
                scaleY: 0.1,
                scaleX: 0.1,
                originX: "center",
                originY: "center"
            });
            console.log("imgInstance scale");
            canvas.add(imgInstance);
            canvas2.add(imgInstance);
            canvas.renderAll();
            canvas2.renderAll();
            canvas.moveTo(imgInstance, imgInstance.zIndex);
            canvas2.moveTo(imgInstance, imgInstance.zIndex);
            canvas.renderAll();
            canvas2.renderAll();
            console.log("imgInstance add");

            //var imgInstance = new fabric.Image(preview);
            /*this.the_canvas = new fabric.Canvas('main-canvas', {
                preserveObjectStacking: true,
                height:959,
                width:899,
            });*/

        },false);

        /*reader.onloadend = () => {
            var img = new Image(40,40);
	        img.src = reader.result;

            var imgInstance = new fabric.Image(img, {
                width: 899,
                height: 959,
                the_type: "upload",
                zIndex: 2
            });
            this.the_canvas.add(imgInstance);
        }*/

        if (file) {
            reader.readAsDataURL(file);
        }
        //console.log(img.src);
        /*var imgInstance = new fabric.Image(img, {
            width: 40,
            height: 40,
            the_type: "upload",
            zIndex: 2
        });*/
        //var imgInstance = new fabric.Image(img);
        //this.the_canvas.add(imgInstance);
        this.the_front_canvas = canvas;
    }

    saveToCanvas () {
        console.log("FabricCanvas - saveToCanvas")

        let link = document.createElement("a");
        link.href = this.the_canvas.toDataURL({format: 'png'});
          link.download = "design.png";
         link.click();

    }

    fileChangedHandler (event) {
        const file = event.target.files[0];
        this.setState({selectedFile: file});
    }

    render(){
        console.log("FabricCanvas - render - this.state: ", this.state)

        return (
            <div>
              <div className="Button-Field">
                <button class="front_btn" type="button">Front</button>
                </div>
                <div className="canvas-container">
                <div className="canvas-bg">
                <canvas id='front-canvas'> </canvas>
                </div>
                </div>

                  {/*<input type = "file"
                         id = "input"
                         onChange = {this.onDrop} />
                  <img src = ""
        id = "img" />*/}

              <div className="Button-Field">
                <button class="back_btn" type="button">Back</button>
              </div>
              <div className="canvas-container">
              <div className="canvas-bg">
                <canvas id='back-canvas'> </canvas>
                </div>
                </div>
            </div>

        );
    }
}

export default FabricCanvas;
