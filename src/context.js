import React from 'react'

const ToDosContext = React.createContext({
    todos: [],
    currentTodo: {}
})

export default ToDosContext