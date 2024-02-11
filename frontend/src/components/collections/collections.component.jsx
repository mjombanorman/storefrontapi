import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

function Collection({ id, title, products_count, handleCollectionFilter }) {
     const handleClick = () => {
       handleCollectionFilter(id); // Call handleCollectionFilter with the id
     };

  return (
    <ListGroup>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">{title}</div>
        {/* Pass handleClick as the onClick event handler */}
        <Badge onClick={handleClick} bg="primary" pill>
          {products_count}
        </Badge>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default Collection;
