import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';
import TransactionInput from './components/TransactionInput';
import PieGraph from './components/PieGraph';

// Budgeting app built in React Native

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.body}>

        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Hello, Jeffrey!</Text>
        </View>

        {/* Budget */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle} >Budget</Text>
          <PieGraph />
        </View>

        {/* Savings */}

        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle} >Savings</Text>
        </View>

        {/* Today's Transactions */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle} >Today's Transactions</Text>
        </View>

        <View style={styles.items}>
          {/* This is where the transactions will go! */}
          <Task text={'McDonalds'} cost={'8.21'} color={styles.redBG} />
          <Task text={'Credit Card Payment'} cost={'55'} color={styles.greenBG} />
          <Task text={'Amazon'} cost={'125.99'} color={styles.blueBG} />
        </View>
      </View>
      <View style={styles.footer}>
        <TransactionInput />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363636',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  redBG: {
    backgroundColor: '#FF5A5F',
  },
  blueBG: {
    backgroundColor: '#55BCF6',
  },
  greenBG: {
    backgroundColor: '#32a852',
  }
});
