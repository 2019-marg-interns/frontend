import React from 'react';
//import {Col} from 'reactstrap';
//import StackGrid from 'react-stack-grid';
import Image from 'react-image-resizer';

export default class TemplateListItem extends React.Component{
    localAddToCanvas (e) {
        e.preventDefault();
        this.props.addToCanvas(e.target, this.props.property_type, this.props.zIndex);
    }

    render(){

        return(
                <a href="#" className="thumbnail" onClick={this.localAddToCanvas}>
                    <Image
                    src={this.props.url} 
                    width = {40}
                    height = {40}/>
                 </a>
                 
    
             
        );
    }
}