import React, { Component } from "react";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Modal, ModalHeader, ModalBody, Label, Col, Row, Input, FormFeedback } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class FromUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staff: props.staff,
            name: '',
            doB: '',
            startDate: '',
            departmentId: 'Dept01',
            salaryScale: 1,
            annualLeave: 0,
            overTime: 0,
            isModalOpen: false,
            touched: {
                name: false,
                doB: false,
                startDate: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

  // Xử lý khi click vào button Tìm thì sẽ gọi đến hàm này
  handleSearch(event) {  
    const valueInput = this.othername.value;
    this.setState({
      othername: valueInput
    });
    console.log(valueInput);
    event.preventDefault();
  }

  // Xử lý khi click vào button Thêm thì sẽ gọi đến hàm này
  handleSubmit = (values) => {
      this.toggleModal();
      console.log(values)
    const updateNewStaff = {
      // id: Math.floor(Math.random() * 1000 + 1),
      id: this.state.staff.id,
      name: this.state.staff.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      salaryScale: this.state.staff.salaryScale,
      departmentId: this.state.staff.departmentId,
      annualLeave: this.state.staff.annualLeave,
      overTime: this.state.staff.overTime,
      // name: values.name,
      // salaryScale: values.salaryScale,
      // department: values.department,
      // annualLeave: values.annualLeave,
      // overTime: values.overTime,
      image: '/asset/images/alberto.png'
    };
    this.props.onUpdate(updateNewStaff);
  }
  
  // Xử lý khi nhập chưa đủ độ dài vào input
  validate(doB, startDate) {
    const errors = {
      doB: '',
      startDate: ''
    }

      if (this.state.touched.doB && doB.length < 1)
      errors.doB = 'Yêu cầu nhập';

      if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = 'Yêu cầu nhập';

      return errors;
  }

    render() {
      // console.log(this.state.staff);
        const errors = this.validate(this.state.doB, this.state.startDate);
        return(
            <React.Fragment>
            <Button onClick={this.toggleModal}>Update</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Cập nhật Nhân Viên</ModalHeader>
                    <ModalBody>
                      <LocalForm onSubmit={(values) => this.handleSubmit (values)}>
                        <Row className="form-group">
                          <Label htmlFor="name">Tên</Label>
                          <Col>
                          <Control.text model=".name" id="name" name="name"
                             placeholder="Vui lòng nhập Họ và Tên"
                            className="form-control"
                            validators={{
                              required, minLength: minLength(3), maxLength: maxLength(30)
                            }}
                            />
                          <Errors
                          className="text-danger"
                          model=".name"
                          show="touched"
                          messages={{
                            required: 'Yêu cầu nhập',
                            minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                            maxLength: 'Yêu cầu ít hơn 30 ký tự'
                          }}
                          />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="doB">Ngày sinh</Label>
                          <Col>
                          <Input type="date" id="doB" name="doB"
                            className="form-control"
                            valid={errors.doB === ''}
                            invalid={errors.doB !== ''}
                            value={this.state.doB}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur('doB')}
                            />
                          <FormFeedback>{errors.doB}</FormFeedback>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="startDate">Ngày vào công ty</Label>
                          <Col>
                          <Input type="date" id="startDate" name="startDate"
                            className="form-control"
                            valid={errors.startDate === ''}
                            invalid={errors.startDate !== ''}
                            value={this.state.startDate}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur('startDate')}
                            />
                          <FormFeedback>{errors.startDate}</FormFeedback>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="departmentId">Phòng ban</Label>
                          <Col>
                          <Control.select model=".departmentId" id="departmentId" name="departmentId"
                            className="form-control"
                            defaultValue="Sale"
                            >
                              <option value="Dept01">Sale</option>
                              <option value="Dept02">HR</option>
                              <option value="Dept03">Marketing</option>
                              <option value="Dept04">IT</option>
                              <option value="Dept05">Finance</option>
                          </Control.select>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="salaryScale">Hệ số lương</Label>
                          <Col>
                          <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                            className="form-control"                        />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                          <Col>
                          <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                            className="form-control"
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="overTime">Số ngày đã làm thêm</Label>
                          <Col>
                          <Control.text model=".overTime" id="overTime" name="overTime"
                            className="form-control"
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Button type="submit" color="primary">Update</Button>
                        </Row>                                       
                      </LocalForm>
                    </ModalBody>
                  </Modal>
                </React.Fragment>
        )
    }
}

export default FromUpdate;