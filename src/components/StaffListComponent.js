import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';


class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }

    onDishSeclect(staff) {
        this.setState({ selectedDish: staff});
    }

    renderStaff(staff) {
        if (staff != null) {
            return(
                <Card className="col-12 col-md-12 col-lg-12">
                    {/* <CardImg width="100%" src={staff.image} alt={staff.name} /> */}
                    <CardBody>
                        <CardTitle heading>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </CardBody>
                </Card>
            )
        } else {
            return(
                <div></div>
            );
        }
    }

    render() {
        const stafflist = this.props.staffs.map((staff) => {
            return (
              <div key={staff.id} className="col-12 col-md-6 col-lg-4">
                <Card onClick={() => this.onDishSeclect(staff)}>
                    {/* <CardImg width="100%" src={staff.image} alt={staff.name} /> */}
                    {/* <CardImgOverlay> */}
                    <CardTitle heading>{staff.name}</CardTitle>
                  {/* </CardImgOverlay> */}
                </Card>
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
                {stafflist}
            </div>
            <div className='row'>
                {this.renderStaff(this.state.selectedDish)}
            </div>
          </div>
        );
    }
}

export default StaffList;