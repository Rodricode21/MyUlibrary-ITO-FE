import { Http } from "@/fetchActions.ts/Http";
import { BookQueryParams } from "@/fetchActions.ts/useBooks";
import { Values } from "@/pages/books/create";

export default {
  getBooks(params: BookQueryParams) {
    return Http.get(
      `/books?genre=${params.genre}&author=${params.author}&title=${params.title}`
    );
  },
  createBooks(body: Values) {
    return Http.post(`/books/create`, body);
  },
  getBookById(id: string) {
    return Http.get(`/book/${id}`);
  },
};
