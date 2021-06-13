import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";

import Link from "next/link";
import classNames from "classnames";
import { signin } from "@src/model/api_user";
import styles from "./bdsignin.module.scss";

interface Prop {
	className?: string;
}

export default function BDSignin({ className }: Prop) {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const [isBtnActivate, setBtnActivate] = useState<boolean>(false);
	const { email, password } = inputs;

	const onChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	async function trySignin(e) {
		e.preventDefault();
		if (!isBtnActivate) return;
		try {
			const me = await signin(email, password);
			router.push("/");
		} catch (error) {
			alert(error);
		}
	}

	// 입력 제한 코드
	const btnChangeColor = () => {
		inputs.email.length >= 4 && inputs.password.length >= 4
			? setBtnActivate(true)
			: setBtnActivate(false);
	};

	return (
		<div className={styles.blur}>
			<div className={classNames(className, styles.login_box)}>
				<img src="logo.png" className={styles.logo_image} alt="boundary"></img>
				<h1>Boundary</h1>
				<form>
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
						value="Log In"
						onClick={trySignin}
					/>
					<Link href="/landing">About Boundary</Link>
					<br />
					<Link href="/signup">Get your Account</Link>
				</form>
			</div>
		</div>
	);
}
