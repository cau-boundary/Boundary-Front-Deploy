import React, { useCallback, useEffect } from "react";

import HEAD from "next/head";

interface ILandingPageProps {}

interface IDeviceMockUp {
	complete?: any;
	classList?: any;
	addEventListener?: any;
	style?: any;
}

export default function LandingPage(props: ILandingPageProps) {
	useEffect(() => {
		document.querySelector("html").classList.add("no-js");
		document.querySelector("body").classList.add("is-boxed");
		document.querySelector("body").classList.add("has-animations");
		import("scrollreveal").then(({ default: ScrollReveal }) => {
			revealScrolls(ScrollReveal);
		});
	}, []);

	const revealScrolls = useCallback((ScrollReveal) => {
		const win = window;
		const doc = document.documentElement;

		doc.classList.remove("no-js");
		doc.classList.add("js");

		// Reveal animations
		if (document.body.classList.contains("has-animations")) {
			/* global ScrollReveal */
			// const sr = (window.sr = ScrollReveal());
			const sr = ScrollReveal();

			sr.reveal(".feature", {
				duration: 600,
				distance: "20px",
				easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
				origin: "right",
				interval: 100,
			});

			sr.reveal(".media-canvas", {
				duration: 600,
				scale: ".95",
				easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
				viewFactor: 0.5,
			});
		}

		// Wait that device mockup has loaded before displaying
		let deviceMockup: IDeviceMockUp = document.querySelector(".device-mockup");

		function deviceMockupLoaded() {
			deviceMockup.classList.add("has-loaded");
		}

		if (deviceMockup.complete) {
			deviceMockupLoaded();
		} else {
			deviceMockup.addEventListener("load", deviceMockupLoaded);
		}

		// Features title adjustment
		const featuresSection = document.querySelector(".features");
		const featuresTitle: IDeviceMockUp =
			featuresSection.querySelector(".section-title");
		const firstFeature = document.querySelector(".feature-inner");

		featuresTitlePos();
		win.addEventListener("resize", featuresTitlePos);

		function featuresTitlePos() {
			let featuresSectionLeft = featuresSection
				.querySelector(".features-inner")
				.getBoundingClientRect().left;
			let firstFeatureLeft = firstFeature.getBoundingClientRect().left;
			let featuresTitleOffset = firstFeatureLeft - featuresSectionLeft;
			if (firstFeatureLeft > featuresSectionLeft) {
				featuresTitle.style.marginLeft = `${featuresTitleOffset}px`;
			} else {
				featuresTitle.style.marginLeft = 0;
			}
		}

		// Moving objects
		const movingObjects = document.querySelectorAll(".is-moving-object");

		// Throttling
		function throttle(func, milliseconds) {
			let lastEventTimestamp = null;
			let limit = milliseconds;

			return (...args) => {
				let now = Date.now();

				if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
					lastEventTimestamp = now;
					func.apply(this, args);
				}
			};
		}

		// Init vars
		let mouseX = 0;
		let mouseY = 0;
		let scrollY = 0;
		let coordinateX = 0;
		let coordinateY = 0;
		let winW = doc.clientWidth;
		let winH = doc.clientHeight;

		// Move Objects
		function moveObjects(e, object) {
			mouseX = e.pageX;
			mouseY = e.pageY;
			scrollY = win.scrollY;
			coordinateX = winW / 2 - mouseX;
			coordinateY = winH / 2 - (mouseY - scrollY);

			for (let i = 0; i < object.length; i++) {
				const translatingFactor =
					object[i].getAttribute("data-translating-factor") || 20;
				const rotatingFactor =
					object[i].getAttribute("data-rotating-factor") || 20;
				const perspective = object[i].getAttribute("data-perspective") || 500;
				let tranformProperty = [];

				if (object[i].classList.contains("is-translating")) {
					tranformProperty.push(
						"translate(" +
							coordinateX / translatingFactor +
							"px, " +
							coordinateY / translatingFactor +
							"px)",
					);
				}

				if (object[i].classList.contains("is-rotating")) {
					tranformProperty.push(
						"perspective(" +
							perspective +
							"px) rotateY(" +
							-coordinateX / rotatingFactor +
							"deg) rotateX(" +
							coordinateY / rotatingFactor +
							"deg)",
					);
				}

				if (
					object[i].classList.contains("is-translating") ||
					object[i].classList.contains("is-rotating")
				) {
					// tranformProperty = tranformProperty.join(" ");
					let strTranformProperty = tranformProperty.join(" ");
					object[i].style.transform = strTranformProperty;
					object[i].style.transition = "transform 1s ease-out";
					object[i].style.transformStyle = "preserve-3d";
					object[i].style.backfaceVisibility = "hidden";
				}
			}
		}

		// Call function with throttling
		if (movingObjects) {
			win.addEventListener(
				"mousemove",
				throttle(function (e) {
					moveObjects(e, movingObjects);
				}, 150),
			);
		}
	}, []);
	return (
		<>
			<HEAD>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Intro</title>
				{/* <link
					href="https://fonts.googleapis.com/css?family=Heebo:400,500,700|Playfair+Display:700"
					rel="stylesheet"
				/> */}
				<link rel="stylesheet" href="template/css/style.css" />
			</HEAD>
			<div className="body-wrap boxed-container">
				<header className="site-header">
					<div className="container">
						<div className="site-header-inner">
							<div className="brand header-brand">
								<h1 className="m-0">
									<a href="/">
										{/* <img
											src="/logo.png"
											alt="Boundary"
											width="32"
											height="32"
										/> */}
									</a>
								</h1>
							</div>
						</div>
					</div>
				</header>

				<main>
					<section className="hero">
						<div className="container">
							<div className="hero-inner">
								<div className="hero-copy">
									<h1 className="hero-title mt-0">Chat with Boundaries</h1>
									<p className="hero-paragraph">Chat with People around 1KM</p>
									<div className="hero-cta">
										<a className="button button-shadow" href="/">
											Start
										</a>
									</div>
								</div>
								<div className="hero-app">
									<div className="hero-app-illustration">
										{/* <svg
											width="999"
											height="931"
											xmlns="http://www.w3.org/2000/svg"
										>
											<defs>
												<linearGradient
													x1="92.827%"
													y1="0%"
													x2="53.422%"
													y2="80.087%"
													id="hero-shape-a"
												>
													<stop stopColor="#F9425F" offset="0%" />
													<stop
														stopColor="#F97C58"
														stopOpacity="0"
														offset="100%"
													/>
												</linearGradient>
												<linearGradient
													x1="92.827%"
													y1="0%"
													x2="53.406%"
													y2="80.12%"
													id="hero-shape-b"
												>
													<stop stopColor="#47A1F9" offset="0%" />
													<stop
														stopColor="#F9425F"
														stopOpacity="0"
														offset="80.532%"
													/>
													<stop
														stopColor="#FDFFDA"
														stopOpacity="0"
														offset="100%"
													/>
												</linearGradient>
												<linearGradient
													x1="8.685%"
													y1="23.733%"
													x2="85.808%"
													y2="82.837%"
													id="hero-shape-c"
												>
													<stop
														stopColor="#FFF"
														stopOpacity=".48"
														offset="0%"
													/>
													<stop
														stopColor="#FFF"
														stopOpacity="0"
														offset="100%"
													/>
												</linearGradient>
												<linearGradient
													x1="79.483%"
													y1="15.903%"
													x2="38.42%"
													y2="70.124%"
													id="hero-shape-d"
												>
													<stop stopColor="#47A1F9" offset="0%" />
													<stop
														stopColor="#FDFFDA"
														stopOpacity="0"
														offset="100%"
													/>
												</linearGradient>
												<linearGradient
													x1="99.037%"
													y1="26.963%"
													x2="24.582%"
													y2="78.557%"
													id="hero-shape-e"
												>
													<stop
														stopColor="#FDFFDA"
														stopOpacity=".64"
														offset="0%"
													/>
													<stop
														stopColor="#F97C58"
														stopOpacity=".24"
														offset="42.952%"
													/>
													<stop
														stopColor="#F9425F"
														stopOpacity="0"
														offset="100%"
													/>
												</linearGradient>
											</defs>
											<g fill="none" fillRule="evenodd">
												<g className="hero-shape-top">
													<g
														className="is-moving-object is-translating"
														data-translating-factor="280"
													>
														<path
															d="M680.188 0c-23.36 69.79-58.473 98.3-105.34 85.531-70.301-19.152-189.723-21.734-252.399 91.442-62.676 113.175-144.097 167.832-215.195 118.57C59.855 262.702 24.104 287.85 0 370.988L306.184 566.41c207.164-4.242 305.67-51.612 295.52-142.11-10.152-90.497 34.533-163.55 134.054-219.16l4.512-119.609L680.188 0z"
															fill="url(#hero-shape-a)"
															transform="translate(1)"
														/>
													</g>
													<g
														className="is-moving-object is-translating"
														data-translating-factor="100"
													>
														<path
															d="M817.188 222c-23.36 69.79-58.473 98.3-105.34 85.531-70.301-19.152-189.723-21.734-252.399 91.442-62.676 113.175-144.097 167.832-215.195 118.57-47.399-32.841-83.15-7.693-107.254 75.445L443.184 788.41c207.164-4.242 305.67-51.612 295.52-142.11-10.152-90.497 34.533-163.55 134.054-219.16l4.512-119.609L817.188 222z"
															fill="url(#hero-shape-b)"
															transform="rotate(-53 507.635 504.202)"
														/>
													</g>
												</g>
												<g transform="translate(191 416)">
													<g
														className="is-moving-object is-translating"
														data-translating-factor="50"
													>
														<circle
															fill="url(#hero-shape-c)"
															cx="336"
															cy="190"
															r="190"
														/>
													</g>
													<g
														className="is-moving-object is-translating"
														data-translating-factor="80"
													>
														<path
															d="M683.766 133.043c-112.048-90.805-184.688-76.302-217.92 43.508-33.23 119.81-125.471 124.8-276.722 14.972-3.156 120.356 53.893 200.09 171.149 239.203 175.882 58.67 346.695-130.398 423.777-239.203 51.388-72.536 17.96-92.03-100.284-58.48z"
															fill="url(#hero-shape-d)"
														/>
													</g>
													<g
														className="is-moving-object is-translating"
														data-translating-factor="100"
													>
														<path
															d="M448.206 223.247c-97.52-122.943-154.274-117.426-170.26 16.55C261.958 373.775 169.717 378.766 1.222 254.77c-9.255 95.477 47.794 175.211 171.148 239.203 185.032 95.989 424.986-180.108 424.986-239.203 0-39.396-49.717-49.904-149.15-31.523z"
															fill="url(#hero-shape-e)"
															transform="matrix(-1 0 0 1 597.61 0)"
														/>
													</g>
												</g>
											</g>
										</svg> */}
									</div>
									<img
										className="device-mockup"
										src="template/images/iphone-mockup.png"
										alt="App preview"
									/>
									<div className="hero-app-dots hero-app-dots-1">
										{/* <svg
											width="124"
											height="75"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g fill="none" fillRule="evenodd">
												<path
													fill="#FFF"
													d="M33.392 0l3.624 1.667.984 3.53-1.158 3.36L33.392 10l-3.249-1.639L28 5.196l1.62-3.674z"
												/>
												<path
													fill="#7487A3"
													d="M74.696 3l1.812.833L77 5.598l-.579 1.68L74.696 8l-1.624-.82L72 5.599l.81-1.837z"
												/>
												<path
													fill="#556B8B"
													d="M40.696 70l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L38 72.599l.81-1.837z"
												/>
												<path
													fill="#7487A3"
													d="M4.314 37l2.899 1.334L8 41.157l-.926 2.688L4.314 45l-2.6-1.31L0 41.156l1.295-2.94zM49.314 32l2.899 1.334.787 2.823-.926 2.688L49.314 40l-2.6-1.31L45 36.156l1.295-2.94z"
												/>
												<path
													fill="#556B8B"
													d="M99.696 56l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L97 58.599l.81-1.837zM112.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L110 39.599l.81-1.837zM82.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L80 39.599l.81-1.837zM122.618 57l1.087.5.295 1.059-.347 1.008-1.035.433-.975-.492-.643-.95.486-1.101z"
												/>
											</g>
										</svg> */}
									</div>
									<div className="hero-app-dots hero-app-dots-2">
										{/* <svg
											width="124"
											height="75"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g fill="none" fillRule="evenodd">
												<path
													fill="#556B8B"
													d="M33.392 0l3.624 1.667.984 3.53-1.158 3.36L33.392 10l-3.249-1.639L28 5.196l1.62-3.674zM74.696 3l1.812.833L77 5.598l-.579 1.68L74.696 8l-1.624-.82L72 5.599l.81-1.837zM40.696 70l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L38 72.599l.81-1.837zM4.314 37l2.899 1.334L8 41.157l-.926 2.688L4.314 45l-2.6-1.31L0 41.156l1.295-2.94zM49.314 32l2.899 1.334.787 2.823-.926 2.688L49.314 40l-2.6-1.31L45 36.156l1.295-2.94z"
												/>
												<path
													fill="#FFF"
													d="M99.696 56l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L97 58.599l.81-1.837z"
												/>
												<path
													fill="#556B8B"
													d="M112.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L110 39.599l.81-1.837z"
												/>
												<path
													fill="#FFF"
													d="M82.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L80 39.599l.81-1.837z"
												/>
												<path
													fill="#556B8B"
													d="M122.618 57l1.087.5.295 1.059-.347 1.008-1.035.433-.975-.492-.643-.95.486-1.101z"
												/>
											</g>
										</svg> */}
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="features section">
						<div className="container">
							<div className="features-inner section-inner has-bottom-divider">
								<h2 className="section-title mt-0">Boundary Features</h2>
								<div className="features-wrap">
									<div className="feature is-revealing">
										<div className="feature-inner">
											<div className="feature-icon">
												<svg
													width="64"
													height="64"
													xmlns="http://www.w3.org/2000/svg"
												>
													<defs>
														<linearGradient
															x1="0%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-1-a"
														>
															<stop
																stopColor="#F9425F"
																stopOpacity=".8"
																offset="0%"
															/>
															<stop
																stopColor="#47A1F9"
																stopOpacity=".16"
																offset="100%"
															/>
														</linearGradient>
														<linearGradient
															x1="50%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-1-b"
														>
															<stop stopColor="#FDFFDA" offset="0%" />
															<stop
																stopColor="#F97059"
																stopOpacity=".798"
																offset="49.935%"
															/>
															<stop
																stopColor="#F9425F"
																stopOpacity="0"
																offset="100%"
															/>
														</linearGradient>
													</defs>
													<g fill="none" fillRule="evenodd">
														<path
															d="M24 48H0V24C0 10.745 10.745 0 24 0h24v24c0 13.255-10.745 24-24 24"
															fill="url(#feature-1-a)"
														/>
														<path
															d="M40 64H16V40c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24"
															fill="url(#feature-1-b)"
														/>
													</g>
												</svg>
											</div>
											<h3 className="feature-title mt-24">Map UI</h3>
											<p className="text-sm mb-0">
												Discover people by using Map directly
											</p>
										</div>
									</div>
									<div className="feature is-revealing">
										<div className="feature-inner">
											<div className="feature-icon">
												<svg
													width="68"
													height="64"
													xmlns="http://www.w3.org/2000/svg"
												>
													<defs>
														<linearGradient
															x1="0%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-2-a"
														>
															<stop
																stopColor="#F9425F"
																stopOpacity=".8"
																offset="0%"
															/>
															<stop
																stopColor="#47A1F9"
																stopOpacity=".16"
																offset="100%"
															/>
														</linearGradient>
														<linearGradient
															x1="50%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-2-b"
														>
															<stop stopColor="#FDFFDA" offset="0%" />
															<stop
																stopColor="#F97059"
																stopOpacity=".798"
																offset="49.935%"
															/>
															<stop
																stopColor="#F9425F"
																stopOpacity="0"
																offset="100%"
															/>
														</linearGradient>
													</defs>
													<g fill="none" fillRule="evenodd">
														<path
															d="M9.941 63.941v-24c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24h-24z"
															fill="url(#feature-2-a)"
															transform="rotate(45 33.941 39.941)"
														/>
														<path
															d="M16 0v24c0 13.255 10.745 24 24 24h24V24C64 10.745 53.255 0 40 0H16z"
															fill="url(#feature-2-b)"
														/>
													</g>
												</svg>
											</div>
											<h3 className="feature-title mt-24">Media Chat</h3>
											<p className="text-sm mb-0">
												You can communicate with people using Your Voice
											</p>
										</div>
									</div>
									<div className="feature is-revealing">
										<div className="feature-inner">
											<div className="feature-icon">
												<svg
													width="64"
													height="64"
													xmlns="http://www.w3.org/2000/svg"
												>
													<defs>
														<linearGradient
															x1="50%"
															y1="100%"
															x2="50%"
															y2="43.901%"
															id="feature-3-a"
														>
															<stop
																stopColor="#F97059"
																stopOpacity=".798"
																offset="0%"
															/>
															<stop
																stopColor="#F9425F"
																stopOpacity="0"
																offset="100%"
															/>
														</linearGradient>
														<linearGradient
															x1="58.893%"
															y1="100%"
															x2="58.893%"
															y2="18.531%"
															id="feature-3-b"
														>
															<stop
																stopColor="#F9425F"
																stopOpacity=".8"
																offset="0%"
															/>
															<stop
																stopColor="#47A1F9"
																stopOpacity="0"
																offset="100%"
															/>
														</linearGradient>
														<linearGradient
															x1="50%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-3-c"
														>
															<stop stopColor="#FDFFDA" offset="0%" />
															<stop
																stopColor="#F97059"
																stopOpacity=".798"
																offset="49.935%"
															/>
															<stop
																stopColor="#F9425F"
																stopOpacity="0"
																offset="100%"
															/>
														</linearGradient>
													</defs>
													<g fill="none" fillRule="evenodd">
														<path
															fill="url(#feature-3-a)"
															opacity=".32"
															d="M0 24h64v40H0z"
														/>
														<path
															fill="url(#feature-3-b)"
															d="M40 24H24L0 64h64z"
														/>
														<path
															d="M10 10v22c0 12.15 9.85 22 22 22h22V32c0-12.15-9.85-22-22-22H10z"
															fill="url(#feature-3-c)"
															transform="rotate(45 32 32)"
														/>
													</g>
												</svg>
											</div>
											<h3 className="feature-title mt-24">Simple Design</h3>
											<p className="text-sm mb-0">
												{"Just Use It! You don't need learn how to use it."}
											</p>
										</div>
									</div>
									<div className="feature is-revealing">
										<div className="feature-inner">
											<div className="feature-icon">
												<svg
													width="64"
													height="64"
													xmlns="http://www.w3.org/2000/svg"
												>
													<defs>
														<linearGradient
															x1="0%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-4-a"
														>
															<stop
																stopColor="#F9425F"
																stopOpacity=".8"
																offset="0%"
															/>
															<stop
																stopColor="#47A1F9"
																stopOpacity=".16"
																offset="100%"
															/>
														</linearGradient>
														<linearGradient
															x1="50%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-4-b"
														>
															<stop stopColor="#FDFFDA" offset="0%" />
															<stop
																stopColor="#F97059"
																stopOpacity=".798"
																offset="49.935%"
															/>
															<stop
																stopColor="#F9425F"
																stopOpacity="0"
																offset="100%"
															/>
														</linearGradient>
													</defs>
													<g fill="none" fillRule="evenodd">
														<path
															d="M24 64H0V40c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24"
															fill="url(#feature-4-a)"
															transform="matrix(-1 0 0 1 48 0)"
														/>
														<path
															d="M40 48H16V24C16 10.745 26.745 0 40 0h24v24c0 13.255-10.745 24-24 24"
															fill="url(#feature-4-b)"
														/>
													</g>
												</svg>
											</div>
											<h3 className="feature-title mt-24">Easy Use</h3>
											<p className="text-sm mb-0">
												Just Login, Enter ChatRoom , Talk
											</p>
										</div>
									</div>
									<div className="feature is-revealing">
										<div className="feature-inner">
											<div className="feature-icon">
												<svg
													width="64"
													height="64"
													xmlns="http://www.w3.org/2000/svg"
												>
													<defs>
														<linearGradient
															x1="0%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-5-a"
														>
															<stop
																stopColor="#F9425F"
																stopOpacity=".8"
																offset="0%"
															/>
															<stop
																stopColor="#47A1F9"
																stopOpacity=".16"
																offset="100%"
															/>
														</linearGradient>
														<linearGradient
															x1="50%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-5-b"
														>
															<stop stopColor="#FDFFDA" offset="0%" />
															<stop
																stopColor="#F97059"
																stopOpacity=".798"
																offset="49.935%"
															/>
															<stop
																stopColor="#F9425F"
																stopOpacity="0"
																offset="100%"
															/>
														</linearGradient>
													</defs>
													<g fill="none" fillRule="evenodd">
														<path
															d="M24 63H0V39c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24"
															fill="url(#feature-5-a)"
															transform="matrix(-1 0 0 1 48 0)"
														/>
														<path
															d="M40 48H16V24C16 10.745 26.745 0 40 0h24v24c0 13.255-10.745 24-24 24"
															fillOpacity=".24"
															fill="url(#feature-5-a)"
															transform="matrix(-1 0 0 1 80 0)"
														/>
														<path
															d="M10.113 10.113v22c0 12.15 9.85 22 22 22h22v-22c0-12.15-9.85-22-22-22h-22z"
															fill="url(#feature-5-b)"
															transform="rotate(45 32.113 32.113)"
														/>
													</g>
												</svg>
											</div>
											<h3 className="feature-title mt-24">Connect</h3>
											<p className="text-sm mb-0">
												Easily connect with new people
											</p>
										</div>
									</div>
									<div className="feature is-revealing">
										<div className="feature-inner">
											<div className="feature-icon">
												<svg
													width="64"
													height="64"
													xmlns="http://www.w3.org/2000/svg"
												>
													<defs>
														<linearGradient
															x1="50%"
															y1="100%"
															x2="50%"
															y2="0%"
															id="feature-6-a"
														>
															<stop stopColor="#FDFFDA" offset="0%" />
															<stop
																stopColor="#F97059"
																stopOpacity=".798"
																offset="49.935%"
															/>
															<stop
																stopColor="#F9425F"
																stopOpacity="0"
																offset="100%"
															/>
														</linearGradient>
														<linearGradient
															x1="58.893%"
															y1="100%"
															x2="58.893%"
															y2="18.531%"
															id="feature-6-b"
														>
															<stop
																stopColor="#F9425F"
																stopOpacity=".8"
																offset="0%"
															/>
															<stop
																stopColor="#47A1F9"
																stopOpacity="0"
																offset="100%"
															/>
														</linearGradient>
													</defs>
													<g fill="none" fillRule="evenodd">
														<path
															d="M24 48H0V24C0 10.745 10.745 0 24 0h24v24c0 13.255-10.745 24-24 24"
															fill="url(#feature-6-a)"
														/>
														<path
															fillOpacity=".64"
															fill="url(#feature-6-b)"
															d="M24 29.229h40V64H0z"
														/>
													</g>
												</svg>
											</div>
											<h3 className="feature-title mt-24">Profiles</h3>
											<p className="text-sm mb-0">Decorate your profiles</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="media section">
						<div className="container-sm">
							<div className="media-inner section-inner">
								<div className="media-header text-center">
									<h2
										className="section-title mt-0"
										style={{
											color: "red",
										}}
									>
										Policy
									</h2>
									<p
										className="section-paragraph mb-0"
										style={{
											color: "red",
										}}
									>
										- Do not use Boundary Application for any illegal purpose.
										<br></br>- We will actively cooperate with the police in
										case of any problems.
									</p>
								</div>

								{/* <iframe
									width="800"
									height="450"
									src="https://www.youtube.com/embed/NMfXWnL8XP4?list=RDMMNMfXWnL8XP4"
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe> */}
							</div>
						</div>
					</section>
				</main>

				<footer className="site-footer">
					<div className="container">
						<div className="site-footer-inner has-top-divider">
							<div className="brand footer-brand">
								<a href="#">
									<svg
										width="32"
										height="32"
										viewBox="0 0 32 32"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Laurel</title>
										<defs>
											<linearGradient
												x1="0%"
												y1="100%"
												x2="50%"
												y2="0%"
												id="logo-footer-a"
											>
												<stop
													stopColor="#F9425F"
													stopOpacity=".8"
													offset="0%"
												/>
												<stop
													stopColor="#47A1F9"
													stopOpacity=".16"
													offset="100%"
												/>
											</linearGradient>
											<linearGradient
												x1="50%"
												y1="100%"
												x2="50%"
												y2="0%"
												id="logo-footer-b"
											>
												<stop stopColor="#FDFFDA" offset="0%" />
												<stop
													stopColor="#F97059"
													stopOpacity=".798"
													offset="49.935%"
												/>
												<stop
													stopColor="#F9425F"
													stopOpacity="0"
													offset="100%"
												/>
											</linearGradient>
										</defs>
										<g fill="none" fillRule="evenodd">
											<path
												d="M22 19.22c6.627 0 9.593-6.415 9.593-13.042C31.593-.45 28.627.007 22 .007S10 2.683 10 9.31c0 6.628 5.373 9.91 12 9.91z"
												fill="url(#logo-footer-a)"
											/>
											<path
												d="M13.666 31.889c7.547 0 10.924-7.307 10.924-14.854 0-7.547-3.377-7.027-10.924-7.027C6.118 10.008 0 13.055 0 20.603c0 7.547 6.118 11.286 13.666 11.286z"
												fill="url(#logo-footer-b)"
												transform="matrix(-1 0 0 1 24.59 0)"
											/>
										</g>
									</svg>
								</a>
							</div>
							<div className="footer-copyright">&copy; 2021 Boundary</div>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}
