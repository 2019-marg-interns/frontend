import React from 'react';
import {connect} from 'react-redux';

import NavBar from '../NavBar/NavBar';

class GroupPage extends React.Component {
	render() {
		if(!this.props.loading) {
			return (
				<p>loading...</p>
			)
		}

		return (
			<div className="GroupPage">
				<NavBar />
				<section className="wrap clear col3">
					<div className="aside">
						{/*<h2 className="h_white">CREATE GROUP</h2>
							<div className="content">
                         </div>*/}
					</div>
					<div className="main">
						<h2 className="h_white">STATISTICS</h2>
							<div className="content">
							</div>
					</div>
					<div className="aside">
						{/*<h2 className="h_black">MY GROUP</h2>
							<div className="content">
	
                        </div>*/}
					</div>
				</section>

			</div>

			
		)
	}
}

const mapStateToProps = (state) => ({
	loading: state.loading
})

export default connect(mapStateToProps)(GroupPage);