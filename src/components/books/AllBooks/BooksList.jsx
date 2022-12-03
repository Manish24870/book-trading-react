import { Box, SimpleGrid } from "@mantine/core";

import BookCard from "./BookCard";

const BooksList = (props) => {
  return (
    <Box>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "lg", cols: 3, spacing: "md" },
          { maxWidth: "md", cols: 2, spacing: "sm" },
          { maxWidth: "sm", cols: 1, spacing: "sm" },
        ]}
      >
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </SimpleGrid>
    </Box>
  );
};

export default BooksList;
