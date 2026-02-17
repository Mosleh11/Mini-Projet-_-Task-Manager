interface BookProps {
  title: string;
  author: string;
}

const BookCard = ({ title, author }: BookProps) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{title}</h3>
      <p>Par: {author}</p>
    </div>
  );
};

export default BookCard;