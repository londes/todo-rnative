import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState([])
  let removedValue=[]

  useEffect(()=> {
    _retrieveData()
  }, [])

  useEffect(()=> {
    _storeData()
  },[taskList])

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(taskList))
    }
    catch (error) {}
  }

  const _retrieveData = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('todos')
      setTaskList(JSON.parse(storedTasks))
    }
    catch (error) {}
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toDoInput}>
        <Text>Input a task</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTask(text)}
          // here we take the value from our text input and set the state so that we can access it.
          value={task}
          onSubmitEditing={(event) => {
            setTaskList( [...taskList, event.nativeEvent.text])
            setTask('')
          }}
        // to submit on press key Enter
        />
        <Text>{task}</Text>
      </View>
      <View style={styles.toDoTasks}>
          {taskList.map((ele, idx) => <Text style={styles.taskText} onPress={()=> {
            removedValue = taskList.splice(idx, 1)
            setTaskList(taskList.filter(ele => ele !== removedValue))
          }} key={idx}>{ele}</Text>)}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toDoInput: {
    flex: 1,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toDoTasks: {
    flex: 3,
    width: 300,
    alignItems: 'center',
    fontSize: 120
  },
  input:{
    height: 40, //40px height to our input
    width:200, //100px width
    borderColor: 'black', //color of our border
    borderWidth: 1 //width of our border
  },
  taskText: {
    fontSize: 22,
    padding: 4
  },
});