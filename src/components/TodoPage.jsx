import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'daymark-todos';
const FILTERS = ['All', 'Active', 'Completed'];

function readTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

function TodoPage({ onLogout }) {
  const [todos, setTodos] = useState(readTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const visibleTodos = useMemo(() => {
    if (filter === 'Active') return todos.filter((todo) => !todo.completed);
    if (filter === 'Completed') return todos.filter((todo) => todo.completed);
    return todos;
  }, [filter, todos]);

  function addTodo(event) {
    event.preventDefault();
    const title = newTodo.trim();
    if (!title) return;
    setTodos((currentTodos) => [
      { id: `${Date.now()}-${Math.random()}`, title, completed: false },
      ...currentTodos,
    ]);
    setNewTodo('');
  }

  function toggleTodo(id) {
    setTodos((currentTodos) => currentTodos.map((todo) => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )));
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  const dateLabel = new Intl.DateTimeFormat('en', {
    weekday: 'long', month: 'long', day: 'numeric',
  }).format(new Date());

  return (
    <main className="todo-layout">
      <header className="topbar">
        <a className="wordmark" href="#today" aria-label="Daymark home"><span>d.</span> daymark</a>
        <div className="topbar-right">
          <span className="user-avatar" aria-hidden="true">S</span>
          <span className="user-email">student@example.com</span>
          <button className="button button-quiet logout-button" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <section className="todo-content" id="today">
        <div className="page-heading">
          <div>
            <p className="eyebrow">YOUR PERSONAL PLANNER</p>
            <h1>Today, in focus<span className="heading-period">.</span></h1>
            <p className="date-label">{dateLabel}</p>
          </div>
          <div className="focus-stamp" aria-hidden="true"><span>✳</span><small>ONE STEP<br />AT A TIME</small></div>
        </div>

        <form className="add-todo-form" onSubmit={addTodo}>
          <span className="add-plus" aria-hidden="true">+</span>
          <label className="visually-hidden" htmlFor="new-todo">Add a task</label>
          <input
            id="new-todo"
            type="text"
            maxLength={160}
            placeholder="What needs your attention?"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          />
          <button className="button button-primary add-button" type="submit">Add task</button>
        </form>

        <div className="list-toolbar">
          <div className="filter-tabs" role="group" aria-label="Filter tasks">
            {FILTERS.map((option) => (
              <button
                className={`filter-tab${filter === option ? ' is-selected' : ''}`}
                key={option}
                onClick={() => setFilter(option)}
                aria-pressed={filter === option}
              >
                {option}
                {option === 'All' && <span className="tab-count">{todos.length}</span>}
              </button>
            ))}
          </div>
          <span className="remaining-count"><strong>{remainingCount}</strong> {remainingCount === 1 ? 'task' : 'tasks'} remaining</span>
        </div>

        <section className="todo-list" aria-label={`${filter} tasks`}>
          {visibleTodos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-spark" aria-hidden="true">✳</span>
              <h2>{filter === 'Completed' ? 'Nothing checked off yet.' : filter === 'Active' ? 'You’re all caught up.' : 'A fresh page.'}</h2>
              <p>{filter === 'Completed' ? 'Finish a task and it will find its way here.' : filter === 'Active' ? 'Everything on your list is done for now.' : 'Add a task above to get your day moving.'}</p>
            </div>
          ) : (
            visibleTodos.map((todo, index) => (
              <article className={`todo-row${todo.completed ? ' is-complete' : ''}`} key={todo.id}>
                <button
                  className="todo-check"
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={todo.completed ? `Mark ${todo.title} as active` : `Mark ${todo.title} as completed`}
                  aria-pressed={todo.completed}
                >
                  {todo.completed && <span aria-hidden="true">✓</span>}
                </button>
                <span className="todo-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="todo-title">{todo.title}</span>
                <button
                  className="delete-todo"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete ${todo.title}`}
                  title="Delete task"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </article>
            ))
          )}
        </section>
        <footer className="todo-footer"><span>✳</span> A little progress is still progress.</footer>
      </section>
    </main>
  );
}

export default TodoPage;
