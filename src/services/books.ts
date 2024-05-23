import { Http } from "@/fetchActions.ts/Http";
import { Book } from "@/fetchActions.ts/useBooks";

export default {
  getBooks() {
    return Http.get("/books");
  },
};
