import Loading from "@/components/Loading";
import books from "@/services/books";
import { Button, SxProps, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

export interface Values {
  author: string;
  title: string;
  genre: string;
  published_year: string;
}

const CreateBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<Values>({
    author: "",
    title: "",
    genre: "",
    published_year: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setValues((prevParams) => ({
      ...prevParams,
      published_year: date ? date.format("YYYY-MM-DD") : "",
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    books
      .createBooks(values)
      .then((response) => {
        console.log(response);
        console.log("Book created:", response.data);
        setIsLoading(false);
        toast.success("the book has been create successfully");
      })
      .catch((error) => {
        console.error("Error creating book:", error);
        toast.error("something wrong");
      });
  };
  if (isLoading) return <Loading />;

  return (
    <Box sx={{ minHeight: "800px", display: "flex" }}>
      <Box sx={Wrapper}>
        <Box sx={InputContainer}>
          <Typography>Create Books</Typography>

          <TextField
            fullWidth
            id="outlined-password-input"
            label="Author"
            name="author"
            type="text"
            value={values.author}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="outlined-password-input"
            label="Title"
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="outlined-password-input"
            label="Genre"
            name="genre"
            type="text"
            value={values.genre}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={
                values.published_year ? dayjs(values.published_year) : null
              }
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button variant="outlined" onClick={handleSubmit}>
            Create Book
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateBooks;

const Wrapper: SxProps = {
  borderRadius: "8px",
  border: "8px solid black",
  minWidth: "500px",
  margin: "auto",
};

const InputContainer: SxProps = {
  display: "grid",
  gap: "8px",
  padding: "16px",
};
