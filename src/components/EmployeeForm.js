import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Flex, InputItem } from 'antd-mobile';
import { CardSection } from './common';
import { employeeUpdate } from '../actions';

class EmployeeForm extends Component {

  render() {
      return (
      <View>
       <CardSection>
          <Flex.Item>
            <InputItem
              placeholder="Jone David"
              onChange={value => this.props.employeeUpdate({ prop: 'name', value })}
              value={this.props.name}
            >Name</InputItem>
          </Flex.Item>
        </CardSection>

        <CardSection>
          <Flex.Item>
            <InputItem
              placeholder="123-456-789"
              onChange={value => this.props.employeeUpdate({ prop: 'phone', value })}
              value={this.props.phone}
            >Phone</InputItem>
          </Flex.Item>
        </CardSection>

        <CardSection>
        <Text style={styles.pickerTextStyle}>Shift</Text>
          <Picker
            style={{ flex: 2 }}
            selectedValue={this.props.shift}
            onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
      );
  }

}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 8,
    flex: 1,
  }
};

const mapStateToProps = (state) => {
  console.log(state.employeeForm);
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
