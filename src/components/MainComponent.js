import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffListComponent';
import Staff from './StaffDetailComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { STAFFS } from '../shared/staffs';
// import { DEPARTMENTS } from '../shared/staffs';


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}
class Main extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   staffs: STAFFS,
    //   departments: DEPARTMENTS
    // }
    this.handleAddStaff = this.handleAddStaff.bind(this);
  }

  // Xử lí hàm thêm nhân viên
  handleAddStaff(newStaff) {
    const addStaff = this.props.staffs.push(newStaff)
    this.setState({
      staffs: [...this.props.staffs, addStaff]
    });
  }
  
  render() {
    
    const StaffWithId = ({match}) => {
      console.log(parseInt(match.params.staffId))

        return(
            <Staff staff={this.props.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
        );
    }
    return (
        <div className="App">
        <Header />
        <Switch>
        <Route exact path="/stafflist" component={() => <StaffList staffs={this.props.staffs} onAddStaff={this.handleAddStaff} />} />
        <Route path="/stafflist/:staffId" component={StaffWithId} /> 
        <Route exact path="/department" component={() => <Department departments={this.props.departments} />} />
        <Route exact path="/salary" component={() => <Salary staffs={this.props.staffs} />} />
        <Redirect to="/stafflist" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));