import { useState, useEffect, useCallback } from "react";
import books from "@/services/books";
import dayjs from "dayjs";
import { useDebounce } from "@/hooks/useDebounce";

export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: string;
  genre: string;
  copies: number;
}

export type BookQueryParams = Pick<Book, "title" | "author" | "genre">;

const useBooks = (params: BookQueryParams) => {
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedParams = useDebounce(params, 2000);
  console.log(debouncedParams);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await books.getBooks(debouncedParams);
      console.log(response.data);
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
  }, [debouncedParams]);

  useEffect(() => {
    fetchBooks();
  }, [debouncedParams]);

  return { books: booksList, loading, error };
};

export default useBooks;
