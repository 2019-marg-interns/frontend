import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../NavBar/NavBar';
import ChangePWPage from './ChangePWPage';
import EscapePage from './EscapePage';

class ProfilePage extends React.Component {
    render() {
      if(!this.props.loading) {
        return(
          <p>loading..</p>
        )
      }
      return (
        <div>
        <NavBar />
            <section className="wrap clear">

                <div className="main">
                <h2 className="h_white">CHANGE PROFILE</h2>

                <div className="illust">
                </div>
                  <div className="Text-Field">
                    <label>
                    ID
                    </label>
                    <div className="bordered_textarea">{this.props.profile_user}</div>
                  </div>

                    <ChangePWPage/>
                    <EscapePage/>
                    </div>

            </section>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        profile_user : Object.assign(state.authorization).split(":")[0]

    }
}

export default ProfilePage = connect(mapStateToProps)(ProfilePage);
