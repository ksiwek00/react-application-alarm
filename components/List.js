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
  Vibration
} from "react-native";
import Button from "./MyButton";
import { Feather } from "@expo/vector-icons";
import Database from "./Database";

class Day extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{ width: 60, height: 60 }}
        onPress={this.props.selectFunc}
      >
        {this.props.data.selected == false ? (
          <Text
            style={{
              flex: 1,
              textAlignVertical: "center",
              textAlign: "center",
              color: "#ffffff",
              padding: 5
            }}
          >
            {this.props.data.name}
          </Text>
        ) : (
          <Text
            style={{
              flex: 1,
              textAlignVertical: "center",
              textAlign: "center",
              color: "#F9A825",
              backgroundColor: "#ffffff",
              borderRadius: 30,
              padding: 5
            }}
          >
            {this.props.data.name}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.data);
    this.state = {
      id: this.props.data.id,
      hours: this.props.data.hours,
      minutes: this.props.data.minutes,
      switched: this.props.data.state == "true",
      extended: false,
      height: this.getInitialState().height,
      days: JSON.parse(this.props.data.dates),
      selectedDays: 0,
      visible: "flex"
    };

    this.toValue = 200;
  }

  getInitialState() {
    return { height: new Animated.Value(200) };
  }

  toggleHeight = async () => {
    if (!this.state.extended) {
      this.toValue = 250;
    } else {
      this.toValue = 200;
    }
    Animated.spring(this.state.height, {
      toValue: this.toValue
    }).start();
    var extending = !this.state.extended;
    this.setState({
      extended: extending
    });
  };

  switch = async () => {
    var value = !this.state.switched;
    this.setState({
      switched: value
    });
    await Database.switchState(this.state.id, value.toString());
    this.props.refreshFunc();
  };

  select(day) {
    var days = this.state.days;
    days[day].selected = !days[day].selected;

    var selectedDays = this.state.selectedDays;
    if (days[day].selected) {
      selectedDays += 1;
    } else {
      selectedDays -= 1;
    }

    this.setState({
      days: days,
      selectedDays: selectedDays
    });
  }

  getSelectedDays() {
    var items = "";
    this.state.days.map(function(item) {
      if (item.selected) {
        items = items + item.name + ", ";
      }
    });
    items = items.slice(0, -2);
    return items;
  }

  render() {
    var that = this;
    return (
      <Animated.View
        style={{
          width: "100%",
          paddingLeft: 50,
          paddingRight: 50,
          height: this.state.height,
          borderBottomWidth: 1,
          borderBottomColor: "black",
          marginBottom: 5,
          marginLeft: "auto",
          marginRight: "auto",
          display: this.state.visible
        }}
      >
        {this.state.extended == false ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 50,
                    color: "#ffffff"
                  }}
                >
                  {this.state.hours}:{this.state.minutes}
                </Text>
              </View>
              <View>
                <Switch
                  onValueChange={() => this.switch()}
                  value={this.state.switched}
                  trackColor={{ true: "#f0f0f0", false: null }}
                  thumbColor="#ffffff"
                ></Switch>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    "rgba(255,255,255,1)",
                    true
                  )}
                  onPress={() => {
                    Database.remove(that.props.data.id);

                    that.setState({
                      visible: "none"
                    });
                  }}
                  style={{
                    width: 45,
                    height: 45
                  }}
                >
                  <View style={{ width: 45, height: 45 }}>
                    <Feather name="trash-2" size={45} color="#ffffff" />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    "rgba(255,255,255,1)",
                    true
                  )}
                  onPress={() => that.toggleHeight()}
                  style={{
                    width: 45,
                    height: 45
                  }}
                >
                  <View style={{ width: 45, height: 45 }}>
                    <Feather name="chevron-down" size={45} color="#ffffff" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
            {that.state.selectedDays > 0 ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    textAlign: "left",
                    width: "100%"
                  }}
                >
                  {this.getSelectedDays()}
                </Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 50,
                    color: "#ffffff"
                  }}
                >
                  {this.state.hours}:{this.state.minutes}
                </Text>
              </View>
              <View>
                <Switch
                  onValueChange={() => this.switch()}
                  value={this.state.switched}
                  trackColor={{ true: "#f0f0f0", false: null }}
                  thumbColor="#ffffff"
                ></Switch>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    "rgba(255,255,255,1)",
                    true
                  )}
                  onPress={() => {
                    Database.remove(that.props.data.id);

                    that.setState({
                      visible: "none"
                    });
                  }}
                  style={{
                    width: 45,
                    height: 45
                  }}
                >
                  <View style={{ width: 45, height: 45 }}>
                    <Feather name="trash-2" size={45} color="#ffffff" />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(
                    "rgba(255,255,255,1)",
                    true
                  )}
                  onPress={() => that.toggleHeight()}
                  style={{
                    width: 45,
                    height: 45
                  }}
                >
                  <View style={{ width: 45, height: 45 }}>
                    <Feather name="chevron-up" size={45} color="#ffffff" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <FlatList
                data={this.state.days}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10
                }}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => (
                  <Day
                    selectFunc={() => that.select(index)}
                    data={that.state.days[index]}
                  />
                )}
              />
            </View>
          </View>
        )}
      </Animated.View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [
        // { hours: "00", minutes: "00" },
        // { hours: "10", minutes: "05" },
        // { hours: "00", minutes: "00" },
        // { hours: "10", minutes: "05" },
        // { hours: "00", minutes: "00" },
        // { hours: "10", minutes: "05" },
        // { hours: "00", minutes: "00" },
        // { hours: "10", minutes: "05" }
      ]
    };
  }

  checkForAlarm() {
    var that = this;
    setInterval(function() {
      var minutes = new Date().getMinutes().toString();
      var hours = new Date().getHours().toString();
      for (var i = 0; i < that.state.data.length; i++) {
        if (
          that.state.data[i].hours == hours &&
          that.state.data[i].minutes == minutes &&
          that.state.data[i].state == "true"
        ) {
          that.state.data[i].state = "false";
          Vibration.vibrate(4000, false);
          setTimeout(function() {
            Vibration.cancel();
          }, 4000);
        }
      }
    }, 1000);
  }

  refresh = async () => {
    var that = this;
    await Database.getAll().then(all => {
      that.setState({
        data: JSON.parse(all).rows._array,
        loading: false
      });
    });
  };

  componentDidMount() {
    this.refresh();
    this.checkForAlarm();
  }

  static navigationOptions = {
    title: "Alarms",
    headerStyle: {
      backgroundColor: "#F9A825"
    },
    headerTitleStyle: {
      color: "#ffffff"
    }
  };

  render() {
    var that = this;
    return (
      <View style={styles.root}>
        {this.state.loading == false ? (
          <View style={{ flex: 1 }}>
            <FlatList
              extraData={this.state}
              data={this.state.data}
              style={{ marginBottom: 125 }}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ item, index }) => (
                <Item
                  that={that}
                  data={this.state.data[index]}
                  refreshFunc={that.refresh}
                />
              )}
            />
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
                that.props.navigation.navigate("AddAlarm", {
                  refreshFunc: that.refresh
                });
              }}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: "#F9A825",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
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
  }
});
