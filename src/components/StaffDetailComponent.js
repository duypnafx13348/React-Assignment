import React from "react";
import { CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

function RenderStaff({staff}) {
    return(
        <div className="col-12">
            <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                        <CardTitle heading>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                </div>
            </div>
        </div>
    );
}

const StaffDetail = (props) => {
    if(props.staff != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/stafflist">Nhân Viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.staff.name}</h3>
                        <hr />
                    </div>                    
                </div>
                <div className="row">
                    <RenderStaff staff={props.staff} />
                </div>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}


export default StaffDetail;