import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
	const [show, handleShow] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				handleShow(true);
			} else handleShow(false);
		});
		return () => {
			window.removeEventListener("scroll");
		};
	}, []);

	return (
		<div className={`nav ${show && "nav__black"}`}>
			<img
				className="nav__logo"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2014_logo.svg/1200px-Netflix_2014_logo.svg.png"
				alt="Netflix Logo"
			/>

			<img
				className="nav__avatar"
				src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
				alt="Avatar"
			/>
		</div>
	);
}

export default Nav;
