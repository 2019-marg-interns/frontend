import React from 'react'
import { connect } from 'react-redux'
import { toChangeIntro } from '../../actions/index.js';

class ChangeIntroPage extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        const onChangeSubmit = () =>{
            if(this.myname.value==="")
                alert("Enter all properties");
            else this.props.onClick(this.props.profile_user,this.myname.value);
        }
        return(
            <div className="Change">
                <br />
                이름<input type="myname" placeholder={this.props.myname}  ref={node=>{this.myname = node;} } id="myname" className="field" />
                <br />


                <button type="submit" id="change_intro" onClick={onChangeSubmit}>SUBMIT</button>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return{
        profile_user:Object.assign(state.authorization).split(":")[0],
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onClick:(profuser,name) =>{
            console.log("ask for intro change");
            dispatch(toChangeIntro(profuser,name));
        }
    }
}

export default ChangeIntroPage= connect(mapStateToProps,mapDispatchToProps)(ChangeIntroPage)
