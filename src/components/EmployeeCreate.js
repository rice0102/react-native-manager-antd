import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Flex, Card } from 'antd-mobile';
import { employeeUpdate, employeeCreate } from '../actions';
import { CardSection } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Flex.Item>
            <Button type="ghost" onClick={this.onButtonPress.bind(this)}>
              Create
            </Button>
          </Flex.Item>
        </CardSection>
      </Card>
    );
  }
}


const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);
