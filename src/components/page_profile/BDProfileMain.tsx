import React from "react";
import styles from "./BDProfileMain.module.scss";

export interface IBDProfileMainProps {}

export default function BDProfileMain(props: IBDProfileMainProps) {
	return (
		<main>
			<div className={styles.container}>
				<div className={styles.gallery}>
					<div className={styles.gallery_item}>
						<img
							src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop"
							className={styles.gallery_image}
							alt=""
						/>

						<div className={styles.gallery_item_type}>
							<span className={styles.visually_hidden}>Gallery</span>
							<i
								className={`${styles.fas} ${styles.fa_clone}`}
								aria-hidden="true"
							></i>
						</div>

						<div className={styles.gallery_item_info}>
							<ul>
								<li className={styles.gallery_item_likes}>
									<span className={styles.visually_hidden}>Likes:</span>
									<i className="fas fa-heart" aria-hidden="true"></i> 45
								</li>
								<li className={styles.gallery_item_comments}>
									<span className={styles.visually_hidden}>Comments:</span>
									<i className="fas fa-comment" aria-hidden="true"></i> 0
								</li>
							</ul>
						</div>
					</div>

					<div className={styles.gallery_item}>
						<img
							src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop"
							className={styles.gallery_image}
							alt=""
						/>

						<div className={styles.gallery_item_type}>
							<span className={styles.visually_hidden}>Gallery</span>
							<i
								className={`${styles.fas} ${styles.fa_clone}`}
								aria-hidden="true"
							></i>
						</div>

						<div className={styles.gallery_item_info}>
							<ul>
								<li className={styles.gallery_item_likes}>
									<span className={styles.visually_hidden}>Likes:</span>
									<i className="fas fa-heart" aria-hidden="true"></i> 30
								</li>
								<li className={styles.gallery_item_comments}>
									<span className={styles.visually_hidden}>Comments:</span>
									<i className="fas fa-comment" aria-hidden="true"></i> 2
								</li>
							</ul>
						</div>
					</div>

					<div className={styles.gallery_item}>
						<img
							src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop"
							className={styles.gallery_image}
							alt=""
						/>

						<div className={styles.gallery_item_type}>
							<span className={styles.visually_hidden}>Gallery</span>
							<i
								className={`${styles.fas} ${styles.fa_clone}`}
								aria-hidden="true"
							></i>
						</div>

						<div className={styles.gallery_item_info}>
							<ul>
								<li className={styles.gallery_item_likes}>
									<span className={styles.visually_hidden}>Likes:</span>
									<i className="fas fa-heart" aria-hidden="true"></i> 30
								</li>
								<li className={styles.gallery_item_comments}>
									<span className={styles.visually_hidden}>Comments:</span>
									<i className="fas fa-comment" aria-hidden="true"></i> 2
								</li>
							</ul>
						</div>
					</div>
				</div>
				{/* <!-- End of gallery --> */}

				<div className="loader"></div>
			</div>
			{/* <!-- End of container --> */}
		</main>
	);
}
