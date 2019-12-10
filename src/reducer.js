
export default function reducer(state, action) {
    switch(action.type) {
        case "GET_TODOS":
            return {
                ...state,
                todos: action.payload
            }
        case "ADD_TODO":
            const addedToDos = [...state.todos, action.payload]
            return {
                ...state,
                todos: addedToDos
            }
        case "TOGGLE_TODO":
            const toggled = state.todos.map(el => {
                if (el.id === action.payload.id) {
                    return action.payload
                } else return el
            })
            return {
                ...state,
                todos: toggled
            }
        case "SET_CURRENT_TODO":
            return {
                ...state,
                currentTodo: action.payload
            }
        case "UPDATE_TODO":
            const updatedToDo = {...action.payload}
            const index = state.todos.findIndex(todo => todo.id === state.currentTodo.id)
            const updatedToDos = [
                ...state.todos.slice(0, index),
                updatedToDo,
                ...state.todos.slice(index + 1)
            ]
            return {
                ...state,
                currentTodo: {},
                todos: updatedToDos
            }
        case "REMOVE_TODO":
            const filtered = state.todos.filter(el => el.id !== action.payload.id)
            const isRemovedToDo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo
            return {
                ...state,
                todos: filtered,
                currentTodo: isRemovedToDo
            }
        default:
            return state
    }
}