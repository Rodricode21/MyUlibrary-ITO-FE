import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Button variant="contained" onClick={() => router.push("/books")}>
          Student
        </Button>
        <Button variant="contained" onClick={() => router.push("/books")}>
          Librarian
        </Button>
      </Box>
    </Box>
  );
}
