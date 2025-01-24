import React, { useState, useEffect, useRef } from "react";
import { fetchTodos, addTodo, deleteTodo } from "@/api/api";

import { DndContext } from '@dnd-kit/core';
import { Draggable } from '@/components/Draggable';
import { Droppable } from '@/components/Droppable';

import '@/styles/todos.scss'

export const Todos = () => {
  const [todos, setTodos] = useState([]); // todosの状態管理


  // Todo一覧の読み込み
  useEffect(() => { // 初回読み込み時に関数発火
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    loadTodos();
  }, []);


  // Todo追加
  const inputRef = useRef();
  const categoryRef = useRef();
  const handleAddTodo =  async (categoryValue, todoValue) => {
    const updatedTodos = await addTodo(categoryValue, todoValue);
    if (!updatedTodos) {
      return;
    }
    // 新しくデータが生成される場合、IDなど追加の情報がサーバー側で付与されることもあるため、サーバーから最新の状態を取得するのがベスト。
    setTodos(updatedTodos);
    inputRef.current.value = '';
    categoryRef.current.value = '';
  };


  // Todo削除
  const handleDeleteTodo = (categoryId, todoId, setTodos) => {
    deleteTodo(categoryId, todoId);
    
    // 最新の状態を読み込むためにfetchTodos()だと再度API通信が必要になるため、見た目を変える処理
    setTodos((previousTodos) => { //useStateによって管理されている現在のtodosの状態
      const updatedTodos = previousTodos.map((category) => {
        if (category.categoryId === categoryId) {
          // 削除対象のtodoをフィルタリングしたデータを作成
          const filteredTodos = category.todos.filter((todo) => todo.id !== todoId);
          return {
            ...category, // もとのカテゴリデータを保持
            todos: filteredTodos, // 更新されたtodos
          };
        }
        return category; // カテゴリが一致しない場合はそのまま返す
      });

      return updatedTodos; // setTodosにフィルタリングしたtodosを設定
    });
  };


  // dnd関連
  const categoryContainer = todos;
  
  // ドラッグ終わったあとに発火
  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over || over.id === active.data.current.categoryId) return;
    
    // ドロップ先のカテゴリ
    const targetCategoryId = over.id;
    
    // ドラッグされたアイテム
    const draggedItemCategory = active.data.current.categoryId;
    const draggedItemId = active.id;
    const draggedItemvalue = active.data.current.todo;

    // 元のカテゴリからtodoを削除
    handleDeleteTodo(draggedItemCategory, draggedItemId, setTodos);

    // 新しいカテゴリにtodoセット
    handleAddTodo(targetCategoryId, draggedItemvalue)
  }

  return (
    <>
      <section className="lists">
        <DndContext onDragEnd={handleDragEnd}>
          {categoryContainer.map((category) => (
            <Droppable key={category.categoryId} id={category.categoryId}>
              <div key={category.categoryId}>
                 <h2 className="category__title">{category.title}</h2>
                 <ul className="category__todos">
                  {category.todos.map((todo) => (
                    <Draggable
                      key={todo.id}
                      // HACK: 内容を直截dataで渡してしまっている
                      id={todo.id}
                      data={{categoryId: category.categoryId, todo: todo.todo}}
                    >
                      <span>{todo.todo}</span>
                      <button onClick={() => handleDeleteTodo(todos.categoryId, todo.id, setTodos)}>Delete</button>
                    </Draggable>
                  ))}
                </ul>
              </div>
            </Droppable>
          ))}
        </DndContext>
      </section>

      <section className="add">
        <select className="add__select" ref={categoryRef}>
          <option value="">--Choose an option--</option>
          {todos.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>{category.title}</option>
          ))}
        </select>
        <input className="add__input" type="text" placeholder="write your todo" ref={inputRef}></input>
        <button  className="add__button" onClick={() => handleAddTodo(categoryRef.current.value, inputRef.current.value)}>Add</button>
      </section>
      
      
      <section className="lists">
        {todos.map((todos) => (
          <div key={todos.categoryId} className="category">
            <h2 className="category__title">{todos.title}</h2>
            <ul className="category__todos">
              {todos.todos.map((todo) => (
                <li className="todo" key={todo.id}>
                   <p>{todo.todo}</p>
                  <button onClick={() => handleDeleteTodo(todos.categoryId, todo.id, setTodos)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      
      
    </>
  );
}
