import { Link } from "react-router-dom";
import { Image, Carousel } from "react-bootstrap";

import "./menu-carousel.styles.css";

const MenuCarousel = ({ todaysMenu, restoId }) => {
  return (
    <div>
      <Carousel pause="hover" className="custom-carousel">
        {todaysMenu.map((menuItem) => (
          <Carousel.Item key={menuItem.id}>
            <Link
              to={`/client-portal/restaurants/${restoId}/menu/${menuItem.id}`}
            >
              <Image src={menuItem.image} alt={menuItem.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h5>
                  {menuItem.name} {menuItem.price && `${menuItem.price} dt`}
                </h5>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MenuCarousel;
