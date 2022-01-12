import React from 'react';
import { Card, CardImg, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderStaffList({staff}) {
        return(
            <Card>
              <Link to={`/stafflist/${staff.id}`}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle heading className="align-center">{staff.name}</CardTitle>
              </Link>
            </Card>
        );
    }

    const StaffList = (props) => {
        const stafflist = props.staffs.map((staff) => {
            return (
              <div key={staff.id} className="col-sm-6 col-md-4 col-lg-2">
                <RenderStaffList staff={staff} />
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
                {stafflist}
            </div>
          </div>
        );        
    }

export default StaffList;