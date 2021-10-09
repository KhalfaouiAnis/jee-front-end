import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from "react-bootstrap";

import "../../../components/menu/menu-carousel.styles.css";

import { menuItemDetails } from "../../../redux/actions/menuActions";
import { addToCart } from "../../../redux/actions/cartActions";
import MenuCarousel from "../../../components/menu/MenuCaroussel.component";

export default function MenuItemDetailsScreen({ match }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const id = Number(match.params.id);

  const menuItemDetailsState = useSelector((state) => state.menuItemDetails);
  const { loading: menuLoading, menuItem } = menuItemDetailsState;

  useEffect(() => {
    dispatch(menuItemDetails(match.params.menuitemid));
  }, [dispatch, match.params.menuitemid]);

  const addToCartHandler = () => {
    dispatch(addToCart(menuItem, id, Number(qty)));
  };

  if (menuLoading) {
    return (
      <div className="homepage-container">
        <div className="row justify-content-center">
          <div className="text-center" style={{ margin: "8rem" }}>
            <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Fragment>
        <Row>
          <Col md={1}>
            <div className="goback-link">
              <Link to={`/client-portal/restaurants/${match.params.id}`}>
                <i className="far fa-arrow-alt-circle-left"></i>
              </Link>
            </div>
          </Col>
          <Col md={5}>
            <Image
              style={{ height: "24rem", width: "90%" }}
              src={menuItem.image}
              alt={menuItem.name}
              fluid
              rounded
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{menuItem.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {menuItem.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} style={{ paddingRight: "2rem" }}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>{menuItem.price} dt</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {menuItem.available > 0 ? "Available" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {menuItem.available && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity :</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(5).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn btn-block"
                    type="button"
                    disabled={!menuItem.available}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <div className="container mt-4 my-3">
            {menuItem?.images?.length > 0 && (
              <MenuCarousel todaysMenu={menuItem.images} />
            )}
          </div>
        </Row>
      </Fragment>
    </div>
  );
}
