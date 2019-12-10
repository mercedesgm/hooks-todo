import React, {useContext, useReducer, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import * as serviceWorker from './serviceWorker';
import ToDosContext from './context'
import toDosReducer from './reducer'
import ToDosList from './components/ToDosList'
import ToDoForm from './components/ToDoForm'

const useApi = endpoint => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await axios.get(endpoint)
        setData(res.data)
    }

    return data
}

const App = () => {
    const initialState = useContext(ToDosContext)
    const [state, dispatch] = useReducer(toDosReducer, initialState)
    const savedTodos = useApi("https://hooks-api.mercedesgm.now.sh/todos")

    useEffect(() => {
        dispatch({
            type: "GET_TODOS",
            payload: savedTodos
        })
    }, [savedTodos])

    return (
        <ToDosContext.Provider value={{state, dispatch}}>
            <ToDosList/>
            <ToDoForm />
        </ToDosContext.Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
