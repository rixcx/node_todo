import { Todos } from "@/components/Todos.jsx"

import '@/styles/app.scss'

function App() {
  return (
    <>
      <main className="main">
        <h1 className="main__title">ToDo list</h1>
        <Todos/>
      </main>
    </>
  )
}

export default App
