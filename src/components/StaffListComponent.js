import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Label, ModalHeader, Modal, ModalBody, Input, Button, Form, FormGroup, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { STAFFS } from '../shared/staffs';

const RenderStaffList = ({staff}) =>  {
        return(
            <Card>
              <Link to={`/stafflist/${staff.id}`}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle heading className="align-center">{staff.name}</CardTitle>
              </Link>
            </Card>
        );
    }

class StaffList extends  Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      id: '',
      name: '',
      doB: '',
      salaryScale: 1,
      startDate: '',
      department: 'Sale',
      annualLeave: 0,
      overTime: 0,
      salary: '',
      othername: '',
      image: '/assets/images/alberto.png',
      touched: {
        name: false,
        doB: false,
        startDate: false
      },
      isModalOpen: false
    }

    this.handleAddStaff = this.handleAddStaff.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFindStaff = this.handleFindStaff.bind(this);
  }

   // Tắt mở Modal
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

    // Xử lý event onChange
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    // Xử  lý event onBlur
    handleBlur = (field) => (evt) => {
      this.setState({
        touched: {...this.state.touched, [field]: true}
      });
    }

    // Xử lý khi click vào button Thêm thì sẽ gọi đến hàm này
    handleAddStaff(event) {
      this.toggleModal();

      const newStaff = {
        id: Math.floor(Math.random() * 1000 + 1),
        name: this.state.name,
        doB: this.state.doB,
        salaryScale: this.state.salaryScale,
        startDate: this.state.startDate,
        department: this.state.department,
        annualLeave: this.state.annualLeave,
        overTime: this.state.overTime,
        image: '/assets/images/alberto.png'
      };
      this.props.onAddStaff(newStaff);
      event.preventDefault();
    }

    // Xử lý khi click vào button Tìm thì sẽ gọi đến hàm này
    handleFindStaff(event) {
      const valueInput = this.othername.value;
      this.setState({
        othername: valueInput
      });
      console.log(valueInput);
      event.preventDefault();
    }
    
    // Xử lý khi nhập chưa đủ độ dài vào input
    validate(name, doB, startDate) {
      const errors = {
        name: '',
        doB: '',
        startDate: ''
      };

      if (this.state.touched.name && name.length < 1)
      errors.name = 'Yêu cầu nhập';
      else if (this.state.touched.name && name.length < 3)
      errors.name = 'Yêu cầu nhiều hơn 2 ký tự';
      else if (this.state.touched.name && name.length > 30)
      errors.name = 'Yêu cầu ít hơn 30 ký tự';

      if (this.state.touched.doB && doB.length < 1)
      errors.doB = 'Yêu cầu nhập';

      if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = 'Yêu cầu nhập';
      
      return errors;
    }

  render() {

    const errors = this.validate(this.state.name, this.state.doB, this.state.startDate);
    
    const stafflist = this.props.staffs
      .filter((checkname) => {
        if (this.state.othername === "") return checkname;
        else if (checkname.name.toLowerCase().includes(this.state.othername.toLowerCase())) return checkname;
        return 0;
      })
      .map((staff) => {
        return (
          <div key={staff.id} className="col-sm-6 col-md-4 col-lg-2">
            <RenderStaffList staff={staff} />
          </div>
        );
      });

    return(
      <div className="container">
        <div className="row">
          <div className="col-9 col-md-3 col-lg-3">
            <h3>Nhân Viên</h3>
          </div>

          {/* Chức năng tìm kiếm nhân viên */}
          <div className="col-3 col-md-3 col-lg-3 mt-1">
            <Button onClick={this.toggleModal}>
              <span className="fa fa-user-plus fa-lg"></span>
            </Button>
          </div>
          <Form onSubmit={this.handleFindStaff} className="col-12 col-md-6 col-lg-6">
          <FormGroup className="row">
            <div className="col-9 col-md-9 col-lg-9 mt-1">
              <Input type="text" name="othername" 
                innerRef={(input) => this.othername = input}
                />
            </div>
            <div className="col-3 col-md-3 col-lg-3 mt-1">
              <Button type="submit" color="primary">Tìm</Button>  
            </div>  
          </FormGroup>
          </Form>

          {/* ModalBox và Chức năng thêm nhân viên */}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleAddStaff}>
              <FormGroup row>
                <Label htmlFor="name">Tên</Label>
                <Col md={8}>
                <Input type="text" id="name" name="name"
                    value={this.state.name}
                    valid={errors.name === ''}
                    invalid={errors.name !== ''}
                    onBlur={this.handleBlur('name')}
                    onChange={this.handleChange}
                  />
                <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="doB">Ngày sinh</Label>
                <Col md={8}>
                <Input type="date" id="doB" name="doB"
                    value={this.state.doB}
                    valid={errors.doB === ''}
                    invalid={errors.doB !== ''}
                    onBlur={this.handleBlur('doB')}
                    onChange={this.handleChange}
                  />
                <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="startDate">Ngày vào công ty</Label>
                <Col md={8}>
                <Input type="date" id="startDate" name="startDate"
                    value={this.state.startDate}
                    valid={errors.startDate === ''}
                    invalid={errors.startDate !== ''}
                    onBlur={this.handleBlur('startDate')}
                    onChange={this.handleChange}
                  />
                <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="department">Phòng ban</Label>
                <Col md={8}>
                <Input type="select" id="department" name="department"
                    value={this.state.department}
                    onChange={this.handleChange}
                    >
                  <option>Sale</option>
                  <option>HR</option>
                  <option>Marketing</option>
                  <option>IT</option>
                  <option>Finance</option>
                </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="salaryScale">Hệ số lương</Label>
                <Col md={8}>
                <Input type="text" id="salaryScale" name="salaryScale"
                  value={this.state.salaryScale}
                  onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                <Col md={8}>
                <Input type="text" id="annualLeave" name="annualLeave"
                  value={this.state.annualLeave}
                  onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="overTime">Số ngày đã làm thêm</Label>
                <Col md={8}>
                <Input type="text" id="overTime" name="overTime"
                  value={this.state.overTime}
                  onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>   
              <FormGroup row>
                <Button type="submit" color="primary">Thêm</Button>
              </FormGroup>                                                         
            </Form>
          </ModalBody>
        </Modal>
        </div>

          <div className="row">
            {stafflist}
          </div>
      </div>     
    );
  }
}


export default StaffList;