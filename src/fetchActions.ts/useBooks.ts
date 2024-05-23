import { useState, useEffect } from "react";
import books from "@/services/books";
import dayjs from "dayjs";

export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: string;
  genre: string;
  copies: number;
}

const useBooks = () => {
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await books.getBooks();
        const formattedBooks = response.data.map((book: Book) => ({
          ...book,
          published_year: dayjs(book.published_year).format("YYYY-MM-DD"),
        }));
        setBooksList(formattedBooks);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books: booksList, loading, error };
};

export default useBooks;
