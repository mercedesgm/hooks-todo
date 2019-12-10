import React, {useContext} from 'react'
import ToDosContext from '../context'
import axios from 'axios';

export default function ToDosList() {
    const {state, dispatch} = useContext(ToDosContext)
    const title = state.todos.length > 0 ? `${state.todos.length} ToDos` : 'Nothing To Do'
    return (
        <div className="container mx-auto max-w-md text-center font-mono">
            <h1 className="text-bold">{title}</h1>
            <ul className="list-reset text-white p-0">
                {state.todos.map(todo => (
                    <li key={todo.id} className="bg-orange-400 border-black border-dashed border 2 my-2 py-4 flex items-center">
                        <span
                            className={`flex-1 m1-12 cursor-pointer ${todo.complete && "line-through text-gray-400"}`}
                            onDoubleClick={async () => {
                                const res = await axios.patch(`https://hooks-api.mercedesgm.now.sh/todos/${todo.id}`, {
                                    complete: !todo.complete
                                })
                                dispatch({type: 'TOGGLE_TODO', payload: res.data})
                            }}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => dispatch({type: "SET_CURRENT_TODO", payload: todo})}
                        >
                            <img src="https://icon.now.sh/edit/0050c5" alt="edit icon" className="h-6"/>
                        </button>
                        <button
                            onClick={async () => {
                                axios.delete(`https://hooks-api.mercedesgm.now.sh/todos/${todo.id}`)
                                dispatch({type: "REMOVE_TODO", payload: todo})
                            }}
                        >
                            <img src="https://icon.now.sh/delete/8b0000" alt="delete icon" className="h-6"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}