import React from "react";
import { render } from "react-dom";
import Library from './Library'

let bookList = [
  { title: "The Sun Also Rises", author: "Ernest Hemingway", pages: 260 },
  { title: "The Legend of the Drow", author: "R.A Salvatore", pages: 400 },
  {
    title: "The Rock Climber's Training Manual",
    author: "Anderson bros",
    pages: 560,
  },
  { title: "Akira", author: "Katsuhiro Otomo", pages: 160 },
];



render(<Library books={bookList} />, document.getElementById("root"));
