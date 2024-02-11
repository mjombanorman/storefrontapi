import "./product-item.styles.css";
import { TbShoppingBagPlus } from "react-icons/tb";
const ProductItem = ({ product }) => {
    return (
      <div className="col-3">
        <div key={product.id} className="card">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-row align-items-center time">
              <i className="fa fa-clock-o"></i>
              {/* <small className="ml-1">{title}</small> */}
            </div>

            {/* <img src="https://i.imgur.com/suuFVrQ.png" width="20" /> */}
          </div>

          <div className="text-center">
            <img src="https://i.imgur.com/TbtwkyW.jpg" width="250" />
          </div>

          <div className="text-center">
            <h5>{product.title}</h5>
            <div className="d-flex justify-content-between align-items-center">
              <TbShoppingBagPlus /> {/* Item on the left */}
              <span className="text-success"> ${product.unit_price} </span>
              {/* Item on the right */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductItem;
