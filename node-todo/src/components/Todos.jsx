import React, { useState, useEffect, useRef } from "react";
import { fetchTodos, addTodo, deleteTodo } from "@/api/api";

import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Draggable } from '@/components/Draggable';
import { Droppable } from '@/components/Droppable';

import '@/styles/todos.scss'

export const Todos = () => {
  const [todos, setTodos] = useState([]); // todosの状態管理
  const [isLoading, setIsLoading] = useState(false);

  // Todo一覧の読み込み
  useEffect(() => {
    setIsLoading(true);
    const cachedTodos = sessionStorage.getItem("todos");
    if (cachedTodos) {
      setTodos(JSON.parse(cachedTodos));
      setIsLoading(false);
    }

    fetchTodos()
      .then((data) => {
        setTodos(data);
        sessionStorage.setItem("todos", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  // Enter受付
  const [isComposing, setIsComposing] = useState(false);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isComposing) {
      handleAddTodo(categoryRef.current.value, inputRef.current.value);
    }
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

  // 発火のタイミング
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const sensors = useSensors(
    mouseSensor,
  );

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
    handleAddTodo(targetCategoryId, draggedItemvalue);
  }

  return (
    <>
      <section className="add">
        <select className="add__select" ref={categoryRef}>
          <option value="">--Choose category--</option>
          {todos.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>{category.title}</option>
          ))}
        </select>
        <input className="add__input" type="text" placeholder="write your todo" ref={inputRef} onKeyDown={handleKeyDown} onCompositionStart={() => setIsComposing(true)} onCompositionEnd={() => setIsComposing(false)}></input>
        <button  className="add__button" onClick={() => handleAddTodo(categoryRef.current.value, inputRef.current.value)}>Add</button>
      </section>
      
      {isLoading ? (
        <p className="spinner">
          <span></span> Loading your todos...
        </p>
        ) : (
          <section className="lists">
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
              {categoryContainer.map((category) => (
                <Droppable key={category.categoryId} id={category.categoryId} categoryId={category.categoryId}>
                  <div key={category.categoryId}>
                    <h2 className={`category__title category__title--${category.categoryId}`}>{category.title}</h2>
                    <ul className="category__todos">
                      {category.todos.map((todo) => (
                        <Draggable
                          key={todo.id}
                          // HACK: 内容を直截dataで渡してしまっている
                          id={todo.id}
                          data={{categoryId: category.categoryId, todo: todo.todo}}
                        >
                          <span>{todo.todo}</span>
                          <button onClick={() => handleDeleteTodo(category.categoryId, todo.id, setTodos)} />
                        </Draggable>
                      ))}
                    </ul>
                  </div>
                </Droppable>
              ))}
            </DndContext>
          </section>
        )}
    </>
  );
}
