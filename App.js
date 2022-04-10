import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';
import TransactionInput from './components/TransactionInput';
import PieGraph from './components/PieGraph';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

// Budgeting app built in React Native

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>

    //   <View style={styles.body}>

    //     <View style={styles.tasksWrapper}>
    //       <Text style={styles.sectionTitle}>Hello, Jeffrey!</Text>
    //     </View>

    //     {/* Budget */}
    //     <View style={styles.tasksWrapper}>
    //       <Text style={styles.sectionTitle} >Budget</Text>
    //       <PieGraph />
    //     </View>

    //     {/* Savings */}

    //     <View style={styles.tasksWrapper}>
    //       <Text style={styles.sectionTitle} >Savings</Text>
    //     </View>

    //     {/* Today's Transactions */}
    //     <View style={styles.tasksWrapper}>
    //       <Text style={styles.sectionTitle} >Today's Transactions</Text>
    //     </View>

    //     <View style={styles.items}>
    //       {/* This is where the transactions will go! */}
    //       <Task text={'McDonalds'} cost={'8.21'} color={styles.redBG} />
    //       <Task text={'Credit Card Payment'} cost={'55'} color={styles.greenBG} />
    //       <Task text={'Amazon'} cost={'125.99'} color={styles.blueBG} />
    //     </View>
    //   </View>
    //   <View style={styles.footer}>
    //     <TransactionInput />
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({

});
