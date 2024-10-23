import { Container } from "@mui/material"
import useHabitStore from "./store/store"
import AddHabitForm from "./components/add-habit-form"
import HabitList from "./components/habit-list"
import { useEffect } from "react";


function App() {
const { fetchHabits } = useHabitStore();
useEffect(() => {
  fetchHabits();
}, []);
  return (
    <Container maxWidth="sm">
   <h1>Welcome to habit tracker</h1> 
<AddHabitForm/>
<HabitList/>
  </Container>
  )
}

export default App
