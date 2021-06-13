import React, { useEffect, useState } from "react";
import { editNickname, editProfileImage } from "@src/model/api_user";

import { BDUser } from "@src/model/models";
import router from "next/router";
import styles from "./BDProfileHeader.module.scss";

export interface IBDProfileHeaderProps {
	userInfo: BDUser;
}

export default function BDProfileHeader(props: IBDProfileHeaderProps) {
	const {
		userInfo: { email, nickname, profileImage },
	} = props;
	const [inputs, setInputs] = useState({
		nickname: nickname,
	});

	const onChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
		if (name === "profileImage") {
			const onProfileImageChanged = async () => {
				await editProfileImage(e.target.files[0]);
				router.reload();
			};
			onProfileImageChanged();
		}
	};

	const [isEdit, setEdit] = useState<boolean>(false);
	const onEditButtonClick = async (e) => {
		e.preventDefault();
		if (isEdit) {
			await editNickname(inputs.nickname);
			router.reload();
		}
		setEdit(!isEdit);
	};

	return (
		<header>
			<div className={styles.container}>
				{/* <button>X</button> */}
				<div className={styles.profile}>
					<div className={styles.profile_image}>
						{profileImage === "https://boundary.or.kr/api/NULL" ? (
							<img src="/default_user.png" alt="" />
						) : (
							<img src={profileImage} alt="" />
						)}
						{isEdit === true && (
							<>
								<label
									htmlFor={styles.profile_image_edit_btn}
									className={styles.profile_image_edit_btn_label}
								>
									<img src="./icon_edit_image.svg" alt="" />
								</label>
								<input
									id={styles.profile_image_edit_btn}
									type="file"
									accept=".jpg,.png"
									name="profileImage"
									onChange={onChange}
								/>
							</>
						)}
					</div>

					<div className={styles.profile_user_settings}>
						{isEdit === true && (
							<>
								<input
									className={styles.profile_user_name_edit}
									type="text"
									name="nickname"
									value={inputs.nickname}
									onChange={onChange}
								/>
								<button
									className={`${styles.btn} ${styles.profile_edit_btn}`}
									onClick={onEditButtonClick}
								>
									Submit
								</button>
							</>
						)}
						{isEdit === false && (
							<>
								<h1 className={styles.profile_user_name}>{nickname}</h1>
								<button
									className={`${styles.btn} ${styles.profile_edit_btn}`}
									onClick={onEditButtonClick}
								>
									Edit Profile
								</button>
							</>
						)}

						<button
							className={`${styles.btn} ${styles.profile_settings_btn}`}
							aria-label="profile settings"
						>
							<i className="fas fa-cog" aria-hidden="true"></i>
						</button>
					</div>

					<div className={styles.profile_stats}>
						{/* <ul> */}
						{/* <li>
								<span className={styles.profile_stat_count}>흑석동</span>{" "}
								usually
							</li> */}
						{/* <li>
								<span className={styles.profile_stat_count}>188</span> friends
							</li>
							<li>
								<span className={styles.profile_stat_count}>206</span> following
							</li> */}
						{/* </ul> */}
					</div>

					<div className={styles.profile_bio}>
						<p>
							<span className={styles.profile_real_name}>intro</span> {email}
						</p>
					</div>
				</div>
				{/* <!-- End of profile section --> */}
			</div>
			{/* <!-- End of container --> */}
		</header>
	);
}
