import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Button, Flex, Card } from 'antd-mobile';
import { employeeUpdate, empolyeeSave, employeeDelete } from '../actions';
import { CardSection, Confirm } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.empolyeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.employee;

    this.props.employeeDelete({ uid });
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Flex.Item>
            <Button type="ghost" onClick={this.onButtonPress.bind(this)}>
              Save Changes
            </Button>
          </Flex.Item>
        </CardSection>

        <CardSection>
          <Flex.Item>
            <Button type="ghost" onClick={this.onTextPress.bind(this)}>
              Text Schedule
            </Button>
          </Flex.Item>
        </CardSection>

        <CardSection>
          <Flex.Item>
            <Button
              type="ghost"
              onClick={() => this.setState({ showModal: !this.state.showModal })}
            >
              Fire EmployeeForm
            </Button>
          </Flex.Item>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}


const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, empolyeeSave, employeeDelete })(EmployeeEdit);
