import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar.js';
import GroupDesignList from './GroupDesignList.js';

class GroupDetailPage extends React.Component {
  constructor(props) {
    super(props);
	}

  render() {
    if (!this.props.loading) {
        return (
            <p>loading...</p>
        )
    }
    return (

      <div >

        <NavBar />
        <section className="wrap clear col3">
          
            <div className="aside">
                <h2 className="h_white">DETAIL</h2>
                <div className="content">
                  <center>
                  <p>디자인 총 {this.props.my_designs.length}개</p>
                  </center>
                </div>
              </div>

          <div className="main">
            <h2 className="h_white">DESIGN LIST</h2>
              <div className="content">
              <ul>
                {this.props.my_designs.map(design =>
                  <GroupDesignList
                    key={design.index}
                    design={design}
                  />
                )}
              </ul>
            </div>
          </div>

          <div className="aside">
            <h2 className="h_black">MY GROUP</h2>
              <div className="content">

              </div>
          </div>
        </section>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    my_designs: state.my_designs,
    loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailPage);
