import React from 'react';
import './App.css'

export class RoundSlider extends React.Component {
    
/*var sliders = document.getElementsByClassName("round-slider");
console.log("Sliders:", sliders);
for (let i = 0; i < sliders.length; i++) {
	sliders[i].addEventListener("click", round_slider_tune, false);
	sliders[i].addEventListener("mousedown", function(event) {
		sliders[i].onmousemove = function(event) {
			if (event.buttons == 1 || event.buttons == 3) {
				round_slider_tune(event);
			}
		}
	});
}*/


    constructor(props){
      this.round_slider_tune = this.round_slider_tune.bind(this);
    }

    componentWillMount() {
       
    }

    componentDidMount() {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate (nextProps, nextState) {
        
    }

    componentDidUpdate(nextProps, nextState) {
      
    }
    
    round_slider_tune(event) {
        let eventDoc = (event.target && event.target.ownerDocument) || document,
            doc = eventDoc.documentElement,
            body = eventDoc.body;
        event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        let output = event.target.getElementsByClassName("selection")[0],
            text = event.target.getElementsByClassName("holder")[0],
            styleafter = document.head.appendChild(document.createElement("style")),
            elpos = event.target.getBoundingClientRect(),
            cX = elpos.width / 2,
            cY = elpos.height / 2,
            eX = event.pageX - elpos.left,
            eY = event.pageY - elpos.top,
            dX = 0,
            dY = 0,
            angle = Math.atan2(cX - eX, cY - eY) * (180 / Math.PI),
            value = 100;
    
    
        if (Math.abs(eX - cX) >= Math.abs(eY - cY)) { // 110 90
            dX = 150 / 2 + Math.sign(eX - cX) * 150 / 2;
            dY = 150 / 2 + (eY - cY) / Math.abs(eX - cX) * 150 / 2;
        } else {
            dX = 150 / 2 + (eX - cX) / Math.abs(eY - cY) * 150 / 2;
            dY = 150 / 2 + Math.sign(eY - cY) * 150 / 2;
        }
        dX = Math.round(dX / 150 * 100)
        dY = Math.round(dY / 150 * 100)
    
        if (0 <= dX && dX < 50 && dY == 0) {
            output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 50% 0%, 50% 50%);";
            value = Math.round((50 - dX) / 50 * 12.5);
        } else if (dX == 0 && 0 <= dY && dY <= 100) {
            output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 0% 0%, 50% 0%, 50% 50%);";
            value = Math.round(12.5 + dY / 100 * 25);
        } else if (0 <= dX && dX <= 100 && dY == 100) {
            output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
            value = Math.round(37.5 + dX / 100 * 25);
        } else if (dX == 100 && 0 <= dY && dY <= 100) {
            output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
            value = Math.round(62.5 + (100 - dY) / 100 * 25);
        } else if (50 <= dX && dX <= 100 && dY == 0) {
            output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
            value = Math.round(87.5 + (100 - dX) / 50 * 12.5);
        }
        styleafter.innerHTML = ".round-slider .selection:after {transform: rotate(" + -angle + "deg);}";
        let hue = Math.floor(value / 100 * 120),
            saturation = Math.abs(value - 50);
        text.innerHTML = value + "%";
        text.style = "color: hsl(" + hue + ", 100%, " + saturation + "%);";
    }

    render() {
        return (
            <div>
            <div class="round-slider">
            <div class="selection"></div>
            <div class="holder">100%</div>
            </div>
            <div class="round-slider">
            <div class="selection"></div>
            <div class="holder">100%</div>
            </div>
            </div>
            );
    }
}

