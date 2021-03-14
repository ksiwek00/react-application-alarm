import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  KeyboardAvoidingView,
  Image,
  FlatList,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";
import Button from "./MyButton";
import { Feather } from "@expo/vector-icons";
import Database from "./Database";

class Dot extends React.Component {
  sendNumber(self) {
    var number = self.props.number.toString();
    if (number.length == 1) {
      number = "0" + number;
    }
    self.props.func(number, self.props.that);
  }

  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("rgba(255,255,255,1)", true)}
        onPress={() => this.sendNumber(this)}
        style={{
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          left: this.props.posX,
          top: this.props.posY,
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 25
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            left: this.props.posX,
            top: this.props.posY,
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 25
          }}
        >
          <Text style={{ color: "#F9A825" }}>{this.props.number}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dots: []
    };
  }

  componentDidMount() {
    var dots = [];
    var that = this;
    if (this.props.type == "hours") {
      for (var i = 0; i < 24; i++) {
        let angle = ((2 * Math.PI) / 24) * i;
        dots.push(
          <Dot
            key={i}
            number={i}
            func={that.props.func}
            that={this.props.that}
            posX={
              Dimensions.get("window").width / 2 + Math.sin(angle) * 300 - 25
            }
            posY={
              Dimensions.get("window").height / 4 + Math.cos(angle) * 300 + 50
            }
          />
        );
      }
    } else {
      for (var i = 0; i < 60; i++) {
        let angle = ((2 * Math.PI) / 60) * i;
        dots.push(
          <Dot
            key={i}
            number={i}
            func={that.props.func}
            that={this.props.that}
            posX={
              Dimensions.get("window").width / 2 + Math.sin(angle) * 300 - 25
            }
            posY={
              Dimensions.get("window").height / 4 + Math.cos(angle) * 300 + 50
            }
          />
        );
      }
    }
    this.setState({
      dots: dots
    });
  }

  render() {
    return (
      <View
        style={{
          position: "relative",
          borderWidth: 1,
          borderColor: "black",
          flex: 1,
          display: this.props.display
        }}
      >
        {this.state.dots}
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: "10",
      minutes: "03",
      hoursState: "flex",
      minutesState: "none"
    };
  }

  static navigationOptions = {
    header: null
  };

  handleBackPress = () => {
    this.props.navigation.state.params.refreshFunc();
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  addAlarm = async (hours, minutes) => {
    Database.add(hours, minutes);
    this.props.navigation.state.params.refreshFunc();
    this.props.navigation.goBack();
  };

  getHourValue(value, that) {
    that.setState({
      hours: value
    });
  }

  getMinuteValue(value, that) {
    that.setState({
      minutes: value
    });
  }

  render() {
    var that = this;
    return (
      <View style={styles.root}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 100
          }}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              "rgba(255,255,255,1)",
              true
            )}
            onPress={() => {
              that.setState({
                hoursState: "flex",
                minutesState: "none"
              });
            }}
            style={{
              width: 150,
              height: 150
            }}
          >
            <View
              style={{
                width: 150,
                height: 150,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {that.state.hoursState == "flex" ? (
                <Text style={[styles.bigText, { color: "red" }]}>
                  {that.state.hours}
                </Text>
              ) : (
                <Text style={styles.bigText}>{that.state.hours}</Text>
              )}
            </View>
          </TouchableNativeFeedback>
          <Text style={[styles.bigText, { height: 150 }]}> : </Text>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              "rgba(255,255,255,1)",
              true
            )}
            onPress={() => {
              that.setState({
                hoursState: "none",
                minutesState: "flex"
              });
            }}
            style={{
              width: 150,
              height: 150
            }}
          >
            <View
              style={{
                width: 150,
                height: 150,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {that.state.minutesState == "flex" ? (
                <Text style={[styles.bigText, { color: "red" }]}>
                  {that.state.minutes}
                </Text>
              ) : (
                <Text style={styles.bigText}>{that.state.minutes}</Text>
              )}
            </View>
          </TouchableNativeFeedback>
        </View>
        <View
          style={{
            flex: 4,
            borderWidth: 1
          }}
        >
          <Clock
            type="hours"
            display={this.state.hoursState}
            func={this.getHourValue}
            that={this}
          />
          <Clock
            type="minutes"
            display={this.state.minutesState}
            func={this.getMinuteValue}
            that={this}
          />
        </View>
        <Button
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#ffffff",
            borderRadius: 40,
            position: "absolute",
            bottom: 25,
            alignSelf: "center"
          }}
          textStyle={{
            flex: 1,
            textAlignVertical: "center",
            textAlign: "center",
            fontSize: 60,
            color: "#F9A825"
          }}
          value="+"
          onClick={function() {
            that.addAlarm(that.state.hours, that.state.minutes);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9A825",
    display: "flex"
  },
  upperMenu: {
    width: "100%",
    height: 100,
    marginTop: 10
  },
  lowerMenu: {
    flex: 1
  },
  button: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15
  },
  item: {
    width: "100%",
    paddingLeft: 50,
    paddingRight: 50,
    height: 200,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 5,
    marginLeft: "auto",
    marginRight: "auto"
  },
  bigText: {
    color: "#ffffff",
    fontSize: 100,
    textAlign: "center",
    textAlignVertical: "center"
  }
});
