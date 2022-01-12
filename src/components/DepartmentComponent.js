import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function Department(props) {

    const jobs = props.departments.map((job) => {
        return(
            <div className="col-12 col-md-6 col-lg-4 border">
            <h1>{job.name}</h1>
            <p>Số lượng nhân viên: {job.numberOfStaff}</p>
            </div>
        );
    });
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/stafflist">Nhân Viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Phòng Ban</BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    {jobs}
                </div>
            </div>
        </div>
    );
}

export default Department;