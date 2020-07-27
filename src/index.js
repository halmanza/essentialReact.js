import React from "react";
import { render } from "react-dom";
import PropTypes from 'prop-types'

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

const Book = ({
  title = "No Title Provided",
  author = "No Author",
  pages = 0,
  freeBookMark,
}) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>by: {author}</p>
      <p>Pages: {pages} page</p>
      <p>Free Bookmark Today: {freeBookMark ? "yes" : "no!"} </p>
    </section>
  );
};

const Hiring = () => (
  <div>
    <p>The Library is Hiring. Go to www.library.com/jobs for more.</p>
  </div>
);

const NotHiring = () => (
  <div>
    <p>The Library is not Hiring. Go to www.library.com/jobs for more.</p>
  </div>
);
class Library extends React.Component {
  static defaultProps = {
    books: [{ title: "Tahoe Tales", author: "Chet Whitley", pages: 1000 }]
  };
  state = {
    open: true,
    freeBookMark: true,
    hiring: true,
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(
      `https://hplussport.com/api/products/order/price/sort/asc/qty/1`
    ).then((data) =>
      data.json().then((data) => this.setState({ data, loading: false }))
    );
  }
  componentDidUpdate() {
    console.log("The component did update!");
  }
  toggleOpenClosed = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };
  render() {
    const { books } = this.props;
    return (
      <div>
        {this.state.hiring ? <Hiring /> : <NotHiring />}
        {this.state.loading ? (
          "loading"
        ) : (
          <div>
            {this.state.data.map((product) => {
              return (
                <div key={product.id}>
                  <h3>Library product of the week</h3>
                  <h4>{product.name}</h4>
                  <img
                    src={product.image}
                    height={100}
                    alt={product.description}
                  />
                </div>
              );
            })}
          </div>
        )}
        <h1>The library is {this.state.open ? "open" : "closed"}</h1>
        <button onClick={this.toggleOpenClosed}>Change</button>
        {books.map((book, i) => (
          <Book
            key={i}
            title={book.title}
            author={book.author}
            pages={book.pages}
            freeBookMark={this.state.freeBookMark}
          />
        ))}
      </div>
    );
  }
}

Library.propTypes = {
  books:PropTypes.array
}



render(<Library books={bookList} />, document.getElementById("root"));
