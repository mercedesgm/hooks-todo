import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import uuidv4 from 'uuid/v4'

import ToDosContext from '../context'

export default function ToDoForm() {
    const [todo, setTodo] = useState("")
    const {state: {currentTodo = {}}, dispatch} = useContext(ToDosContext)
    useEffect(() => {
        if (currentTodo.text) {
            setTodo(currentTodo.text)
        } else {
            setTodo("")
        }
    }, [currentTodo.id])

    const handleSubmit = async event => {
        event.preventDefault()
        if (currentTodo.text) {
            const res = await axios.patch(`https://hooks-api.mercedesgm.now.sh/todos/${currentTodo.id}`, {
                text: todo
            })
            dispatch({type: "UPDATE_TODO", payload: res.data})
        } else {
            const res = await axios.post(`https://hooks-api.mercedesgm.now.sh/todos`, {
                id: uuidv4(),
                text: todo,
                complete: false
            })
            dispatch({type: "ADD_TODO", payload: res.data})
        }
        setTodo("")
    }
    return (
        <form className="flex justify-center p-5" onSubmit={handleSubmit}>
            <input
                type="text"
                className="border-black border-solid border-2"
                onChange={event => setTodo(event.target.value)}
                value={todo}
            />
        </form>
    )
}