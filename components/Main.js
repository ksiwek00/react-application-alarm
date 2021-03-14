import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./MyButton";
import Database from "./Database";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    Database.createTable();
  }

  render() {
    var that = this;
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text style={styles.textBig}>Sqlite App</Text>
          <View style={styles.textSmall}>
            <Text style={styles.textSmall}>
              manage sqlite, use animations, use ring
            </Text>
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              value="START"
              onClick={function() {
                that.props.navigation.navigate("List");
              }}
            />
            <View style={{ flex: 2 }}></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  rootLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9A825"
  },
  topContainer: {
    flex: 1,
    backgroundColor: "#F9A825"
  },
  textBig: {
    flex: 1,
    textAlignVertical: "bottom",
    textAlign: "center",
    fontSize: 75,
    color: "#ffffff"
  },
  textSmall: {
    flex: 2,
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 30,
    color: "#ffffff",
    justifyContent: "center"
  },
  button: {
    flex: 1,
    textAlignVertical: "center",
    fontSize: 40,
    backgroundColor: "#F9A825",
    borderColor: "#FFFFFF",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid"
  },
  buttonText: {
    flex: 1,
    color: "#ffffff",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 50
  },
  activityIndicator: {}
});
