import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import useHabitStore from "../store/store";

type Frequency = "daily" | "weekly";
type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<Frequency>;

const AddHabitForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    frequency: "daily" as Frequency,
  });

  const { habits, addHabit } = useHabitStore();

console.log("component",habits)


  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name as keyof typeof prev]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    const { name, frequency } = formValues;
    e.preventDefault();
    if (name.trim()) {
      addHabit(name, frequency);
      setFormValues({ name: "", frequency: "daily" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Habit name"
          value={formValues.name}
          name="name"
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>frequency</InputLabel>
          <Select
            name="frequency"
            value={formValues.frequency}
            label="Frequency"
            onChange={handleChange}
          >
            <MenuItem value="daily">daily</MenuItem>
            <MenuItem value="weekly">weekly</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">Add Habit</Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
