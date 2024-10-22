import { Container } from "@mui/material"
import useHabitStore from "./store/store"
import AddHabitForm from "./components/add-habit-form"
import HabitList from "./components/habit-list"


function App() {
const store=useHabitStore()
console.log("store",store)
  return (
    <Container maxWidth="sm">
   <h1>Welcome to habit tracker</h1> 
<AddHabitForm/>
<HabitList/>
  </Container>
  )
}

export default App
