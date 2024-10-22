import useHabitStore from '../store/store'
import { Box, Button, Grid, LinearProgress, Paper,Typography } from '@mui/material'

const HabitList = () => {
    const {habits,removeHabit,toggleHabit}=useHabitStore()
    console.log("habitsss", Array.isArray(habits))
    const today = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
    {habits.map((habit) => (
      <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
        <Grid container alignItems="center">
          <Grid xs={12} sm={6}>
            <Typography variant="h6">{habit.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {habit.frequency.charAt(0).toUpperCase() +
                habit.frequency.slice(1)}
            </Typography>
          </Grid>
          <Grid xs={12} sm={6}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                color={
                  habit.completedDates.includes(today) ? "success" : "primary"
                }
                onClick={()=>toggleHabit(habit.id,today)}
              >
 {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}   
                            </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={()=>removeHabit(habit.id)}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Current Streak:days
          </Typography>
          <LinearProgress
            variant="determinate"
            sx={{ mt: 1 }}
          />
        </Box>
      </Paper>
    ))}
  </Box>
  )
}

export default HabitList
