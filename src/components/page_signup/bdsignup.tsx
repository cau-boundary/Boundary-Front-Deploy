import React, { useState } from "react";
import router, { useRouter } from "next/router";

import Link from "next/link";
import classNames from "classnames";
import { signup } from "@src/model/api_user";
import styles from "./bdsignup.module.scss";

interface Prop {
	className?: string;
}

export default function BDSignup({ className }: Prop) {
	const [inputs, setInputs] = useState({
		nickname: "",
		email: "",
		password: "",
	});
	const [isBtnActivate, setBtnActivate] = useState<boolean>(false);

	const { nickname, email, password } = inputs;

	const onChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	function trySignup(e) {
		e.preventDefault();
		if (!isBtnActivate) return;
		signup(nickname, email, password)
			.then((aaa) => {
				router.push("/signin");
			})
			.catch((error) => {
				alert("email already exist");
			});
	}

	// 입력 제한 코드
	const btnChangeColor = () => {
		inputs.nickname.length >= 4 &&
		inputs.email.includes("@") &&
		inputs.password.length >= 4
			? setBtnActivate(true)
			: setBtnActivate(false);
	};

	return (
		<div className={styles.blur}>
			<div className={classNames(className, styles.signup_box)}>
				{/* <div className={styles.signupbox_label}>Boundary</div>
				<div className={styles.field}>
					<input
						type="id"
						name="nickname"
						placeholder="nickname"
						onChange={onChange}
						value={nickname}
					/>
					<input
						type="id"
						name="email"
						placeholder="id"
						onChange={onChange}
						value={email}
					/>
					<input
						type="password"
						name="password"
						placeholder="password"
						onChange={onChange}
						value={password}
					/>
					<button onClick={trySignup}>Signup</button>
				</div> */}
				<img src="logo.png" className={styles.logo_image} alt="boundary"></img>
				<h1>Boundary</h1>
				<form>
					<label htmlFor="username">Username</label>
					<input
						type="id"
						name="nickname"
						placeholder="아이디"
						onChange={onChange}
						onKeyUp={btnChangeColor}
						value={nickname}
					/>
					<label htmlFor="email">Email</label>
					<input
						type="id"
						name="email"
						placeholder="이메일"
						onChange={onChange}
						onKeyUp={btnChangeColor}
						value={email}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						placeholder="패스워드"
						onChange={onChange}
						onKeyUp={btnChangeColor}
						value={password}
					/>

					<input
						className={classNames(
							`${styles.login_btn} ${
								isBtnActivate ? styles.onLoginBtn : styles.offLoginBtn
							}`,
						)}
						type="submit"
						value="Sign up"
						onClick={trySignup}
					/>
				</form>
			</div>
		</div>
	);
}
