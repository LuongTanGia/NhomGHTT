import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/bars-solid.svg";
import Close from "./icon//times.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
    const state = useContext(GlobalState);

    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;

    const logoutUser = async () => {
        await axios.get("/user/logout");

        localStorage.removeItem("firstLogin");

        window.location.href = "/";
    };
    console.log(state);
    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to="/create_product">Create Product</Link>
                </li>
                <li>
                    <Link to="/category">Categories</Link>
                </li>
            </>
        );
    };

    const loggedRouter = () => {
        return (
            <>
                <li>
                    <Link to="/history">History</Link>
                </li>
                <li>
                    <Link to="/" onClick={logoutUser}>
                        Logout
                    </Link>
                </li>
            </>
        );
    };

    return (
        <header class="p-3 bg-dark text-white">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <div className="menu">
                        <img src={Menu} alt="" width="30" />
                    </div>
                    <div className="logo">
                        <h1>
                            <Link to="/">{isAdmin ? "Admin" : "Shop MP"}</Link>
                        </h1>
                    </div>

                    <ul>
                        <li>
                            <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
                        </li>

                        {isAdmin && adminRouter()}
                        {isLogged ? (
                            loggedRouter()
                        ) : (
                            <li>
                                <Link to="/login">Login ~ Register</Link>
                            </li>
                        )}

                        <li>
                            <img
                                src={Close}
                                alt=""
                                width="30"
                                className="menu"
                            />
                        </li>
                    </ul>

                    {isAdmin ? (
                        ""
                    ) : (
                        <div className="cart-icon">
                            <Link to="/cart">
                                <span>{cart.length}</span>
                                <img src={Cart} alt="" width="30" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
