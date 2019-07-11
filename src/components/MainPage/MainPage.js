import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import DesignPage from '../DesignPage/DesignPage';
//import ViewPage from '../DesignPage/ViewPage';
import MyGroupList from '../GroupPage/MyGroupList';
import { signOut } from '../../actions';


class MainPage extends React.Component {

  render() {
      if(!this.props.loading) {
        return(
          <div>
            <p>loading...</p>
          </div>
          
        )
      }
    
      return (
        <div className="app">
          < NavBar/>
          {/*<section className="wrap clear col3">
            <div className="aside">
              <h2 className="h_white">SELECT STYLE</h2>
              <div className="content">
                <DesignPage />
              </div>
            </div>
          </div>
          <div className="main">
            <h2 className="h_white">SAMPLE VIEW</h2>
            <div className="content">
              <ViewPage />
            </div>
          </div>
          <div className="aside">
            <h2 className="h_black">MY GROUP</h2>
            <div className="content">
              <MyGroupList />
            </div>
      </section>*/}
      <DesignPage/>
        </div>
      )

  }
}

const mapStateToProps = (state) => ({
    loading: state.loading
  })

export default connect(mapStateToProps)(MainPage)
