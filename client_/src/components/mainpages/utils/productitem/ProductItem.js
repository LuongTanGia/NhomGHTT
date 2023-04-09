import React from "react";
import BtnRender from "./BtnRender";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
    return (
        <div class="wrapper">
            <div className="product_card">
                {" "}
                {isAdmin && (
                    <input
                        type="checkbox"
                        checked={product.checked}
                        onChange={() => handleCheck(product._id)}
                    />
                )}
                <div class="product-info">
                    <div class="product-text">
                        <h1> {product.title} </h1>{" "}
                        <h2> by studio and friends </h2>{" "}
                        <p> {product.description} </p>{" "}
                    </div>{" "}
                    <div class="product-price-btn">
                        <p>
                            <span> $ {product.price} </span>{" "}
                        </p>{" "}
                        <BtnRender
                            product={product}
                            deleteProduct={deleteProduct}
                        />{" "}
                    </div>{" "}
                </div>{" "}
                <div class="product-img">
                    <img src={product.images.url} alt="" />
                </div>{" "}
            </div>{" "}
            {/* <img src={product.images.url} alt="" />

                        <div className="product_box">
                            <h2 title={product.title}>{product.title}</h2>
                            <span>${product.price}</span>
                            <p>{product.description}</p>
                        </div> */}{" "}
        </div>
    );
}

export default ProductItem;
