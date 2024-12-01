import PropTypes from 'prop-types';
import { CardLink } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function ListingCard({ listing }) {
  return (
    <Card style={{ width: '18rem' }} bg="dark" text="light">
      <Card.Img variant="top" src={listing.imageUrl} />
      <Card.Body>
        <CardLink href={`/listings/${listing.id}`} style={{ color: 'white', textDecoration: 'none' }} passHref>
          <Card.Title>{listing.name}</Card.Title>
        </CardLink>
        <Card.Subtitle>${listing.price}</Card.Subtitle>
        <Card.Text>{listing.condition.name}</Card.Text>
      </Card.Body>
    </Card>
  );
}

ListingCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    condition: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
