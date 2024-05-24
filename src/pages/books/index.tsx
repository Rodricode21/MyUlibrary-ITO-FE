import Loading from "@/components/Loading";
import useBooks from "@/fetchActions.ts/useBooks";
import {
  Card,
  CardContent,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Books = () => {
  const [paramsFilter, setParams] = useState({
    author: "",
    title: "",
    genre: "",
  });
  const router = useRouter();
  const { books, error, loading } = useBooks(paramsFilter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  if (loading) return <Loading />;
  if (error) return <p>Error</p>;

  console.log(books);

  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: "center", marginTop: "10px" }}>
        Books
      </Typography>
      <Box sx={Wrapper}>
        <Box sx={FilterWrapper}>
          <Typography variant="h4">Filter Books</Typography>

          <TextField
            id="outlined-password-input"
            label="Author"
            name="author"
            type="text"
            value={paramsFilter.author}
            onChange={handleChange}
          />
          <TextField
            id="outlined-password-input"
            label="Title"
            name="title"
            type="text"
            value={paramsFilter.title}
            onChange={handleChange}
          />
          <TextField
            id="outlined-password-input"
            label="Genre"
            name="genre"
            type="text"
            value={paramsFilter.genre}
            onChange={handleChange}
          />
        </Box>
        <Card sx={BooksWrapper}>
          {books?.map((book) => (
            <Box key={book.id} sx={BookStyle}>
              <CardContent onClick={() => router.push(`/books/${book.id}`)}>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1">{book.author}</Typography>
                <Typography variant="body2">
                  Published Year: {book.published_year}
                </Typography>
                <Typography variant="body2">Genre: {book.genre}</Typography>
                <Typography variant="body2">Copies: {book.copies}</Typography>
              </CardContent>
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );
};

export default Books;

const Wrapper: SxProps = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  margin: "20px",
};

const FilterWrapper: SxProps = {
  borderRadius: "8px",
  border: "4px solid black",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  maxHeight: "600px",
};

const BooksWrapper: SxProps = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
  justifyContent: "center",
  padding: "20px",
};

export const BookStyle: SxProps = {
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s",
  padding: "20px",
  marginBottom: "20px",
  marginRight: "20px",
  minWidth: "300px",

  backgroundColor: "#ffffff",
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "6px",
    backgroundColor: "black",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  },
};
