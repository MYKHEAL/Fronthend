import{test, expect, beforeEach, afterEach} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";
import BookList from "../components/BookList";


test("sum of 2 and 2 is 5", () => {
    const answer = 2 + 3;
    expect(answer).toBe(5); 
});


const bookList = [
    "kafka on the shore",
    "the master and the margarita",
    "the wise man's fear",
    "name of the wind"

]

    beforeEach(() => {
        render(<BookList listOfBooks ={bookList}/>);
    });

    afterEach(() => {
        cleanup();
    });


test("Test that 'book collection' is present", () => {
  
   const textContent = screen.getByText(/book collection/i);
   expect(textContent).toBeTruthy();


});

test("Test that 'books' is in the document", () => {
  
    const textContent = screen.getByText(/books to read/i);
    expect(textContent).toBeTruthy();
});

test("that the mock list display on my screen", () => {
    const books = screen.getAllByRole("listitem");
    expect(books).toHaveLength(bookList.length);
})
test("that the mock list displays the correct book names", () => {
    const books = screen.getAllByRole("listitem");
    books.forEach((book, index) => {
        expect(book).toHaveTextContent(bookList[index]);
    });
});