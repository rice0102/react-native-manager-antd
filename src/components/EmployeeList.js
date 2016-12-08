import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { List } from 'antd-mobile';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the neext set of props that this Component will be render with
    // this.props is still the old set props
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.dataSource = ds.cloneWithRows(employees);
  }
  renderRow(employee) {
    return (
      <ListItem employee={employee} />
    );
  }


  render() {
    return (
      <List>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
    // {shift:'Monday', name:'Jack', id:'1asd23456'}
  });

  return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
