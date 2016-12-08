import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Flex, ActivityIndicator, InputItem, Card } from 'antd-mobile';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection } from './common';

class LoginFrom extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  renderButton() {
    if (this.props.loading) {
      return (
        <Flex.Item>
          <ActivityIndicator
            size="large"
            text="loading"
          />
        </Flex.Item>
      );
    }

    return (
        <Flex.Item>
          <Button type="primary" onClick={this.onButtonPress.bind(this)} >
            Log in
          </Button>
        </Flex.Item>
    );
  }
  render() {
    return (
      <Card>

        <CardSection>
          <Flex.Item>
            <InputItem
              placeholder="email@gmail.com"
              onChange={this.onEmailChange.bind(this)}
              value={this.props.email}
            >Email</InputItem>
          </Flex.Item>
        </CardSection>

        <CardSection>
          <Flex.Item>
            <InputItem
              placeholder="Password"
              labelNumber={8}
              type="password"
              onChange={this.onPasswordChange.bind(this)}
              value={this.props.password}
            >Password</InputItem>
          </Flex.Item>
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginFrom);
