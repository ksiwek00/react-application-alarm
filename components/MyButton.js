import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick() {
    this.props.onClick();
  }
  render() {
    var styles = StyleSheet.create({
      root: this.props.style,
      text: this.props.textStyle,
      background: this.props.style
    });
    return (
      <TouchableOpacity onPress={this.onClick.bind(this)} style={styles.root}>
        <Text style={styles.text}>{this.props.value}</Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  style: PropTypes.object.isRequired,
  textStyle: PropTypes.object.isRequired,
  fontWeight: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
