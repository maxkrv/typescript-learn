import React, {ChangeEventHandler, useEffect, useRef, useState} from 'react';
import {ITodo} from "./types";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
	const [value, setValue] = useState("");
	const [todos, setTodos] = useState<ITodo[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
	}

	const addTodo = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		if (value) {
			setTodos([...todos, {
				id: Date.now(),
				title: value,
				complete: false,
			}])
			setValue("");
			if (inputRef.current) {
				inputRef.current.focus();
			}
		}
	}
	const toggleTodo = (id: number): void => {
		setTodos(todos.map(todo => {
			if (todo.id !== id) {
				return todo
			}

			return {
				...todo, complete: !todo.complete
			}
		}));
	}
	const removeTodo = (id: number): void => {
		setTodos(todos.filter(todo => todo.id !== id));
	}

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [])

	return (
		<div>
			<form onClick={addTodo}>
				<input value={value} onChange={handleChange} ref={inputRef}/>
				<button>Add todo</button>
			</form>
			<TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
		</div>
	);
};

export default App;