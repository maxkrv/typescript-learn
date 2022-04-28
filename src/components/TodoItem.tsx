import React from 'react';
import {ITodo} from "../types";

interface ITodoItem extends ITodo {
	toggleTodo: (id: number) => void;
	removeTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = ({id, title, complete, toggleTodo, removeTodo}) => {
	return (
		<div>
			<input type="checkbox" checked={complete}  onChange={() => toggleTodo(id)}/>
			{title}
			<button onClick={() => removeTodo(id)}>X</button>
		</div>
	);
};

export default TodoItem;