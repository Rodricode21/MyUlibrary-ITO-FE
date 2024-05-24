import { Book } from "@/fetchActions.ts/useBooks";
import books from "@/services/books";
import { Box, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { BookStyle } from ".";

const BookById = () => {
  const [book, setBook] = useState<Book>();
  const router = useRouter();
  console.log(router.query);

  useEffect(() => {
    const fetchBook = async () => {
      if (!router.query.id) return;
      try {
        const response = await books.getBookById(`${router.query.id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [router.query.id]);

  return (
    <Box margin={2}>
      {book && (
        <Box sx={BookStyle}>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>{book ? book.title : "Loading..."}</Typography>
            <IconButton>
              <BookmarkIcon />
            </IconButton>
          </Box>

          <Typography>Author: {book.author}</Typography>
          <Typography>
            Published Year: {dayjs(book.published_year).format("YYYY-MM-DD")}
          </Typography>
          <Typography>Genre: {book.genre}</Typography>
          <Typography>Copies: {book.copies}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookById;
