import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffListComponent';
import Staff from './StaffDetailComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import Footer from './FooterComponent';
import { STAFFS } from '../shared/staffs';
import { DEPARTMENTS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS
    };
  }

  render() {

    const StaffWithId = ({match}) => {
        return(
            <Staff staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
        );
    }
    return (
        <div className="App">
        <Header />
        <Switch>
        <Route exact path="/stafflist" component={() => <StaffList staffs={this.state.staffs} />} />
        <Route path="/stafflist/:staffId" component={StaffWithId} />
        <Route exact path="/department" component={() => <Department departments={this.state.departments} />} />
        <Route exact path="/salary" component={() => <Salary staffs={this.state.staffs} />} />
        <Redirect to="/stafflist" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;