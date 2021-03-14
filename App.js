import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./components/Main";
import List from "./components/List";
import AddAlarm from "./components/AddAlarm";

const Root = createStackNavigator({
  Main: { screen: Main },
  List: { screen: List },
  AddAlarm: { screen: AddAlarm }
});

const App = createAppContainer(Root);

export default App;
