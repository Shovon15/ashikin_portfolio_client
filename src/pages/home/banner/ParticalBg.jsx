import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticalBg = () => {
	const particlesInit = async (main) => {
		// console.log(main);

		await loadFull(main);
	};
	return (
		<div className=" ">
			<Particles
				className="h-[600px] lg:h-[550px] "
				id="tsparticles"
				init={particlesInit}
				options={{
					background: {
						color: {
							value: "#0F172A",
						},
						image: "",
						position: "",
						repeat: "",
						size: "",
						opacity: 1,
					},
					backgroundMask: {
						composite: "destination-in",
						cover: {
							color: {
								value: "#fff",
							},
							opacity: 1,
						},
						enable: false,
					},

					delay: 0,
					fullScreen: {
						enable: false,
						zIndex: -1,
					},
					detectRetina: true,
					duration: 0,
					fpsLimit: 120,
					interactivity: {
						detectsOn: "window",
						events: {
							onClick: {
								enable: true,
								mode: "repulse",
							},
							onDiv: {
								selectors: [],
								enable: false,
								mode: [],
								type: "circle",
							},
							onHover: {
								enable: true,
								mode: "repulse",
								parallax: {
									enable: true,
									force: 2,
									smooth: 1000,
								},
							},
							resize: {
								delay: 0.5,
								enable: true,
							},
						},
						modes: {
							trail: {
								delay: 0.005,
								pauseOnStop: true,
								quantity: 5,
								particles: {
									color: {
										value: "#ff0000",
										animation: {
											enable: true,
											speed: 400,
											sync: true,
										},
									},
									collisions: {
										enable: false,
									},
									links: {
										enable: false,
									},
									move: {
										outModes: {
											default: "destroy",
										},
										speed: 2,
									},
									size: {
										value: 5,
										animation: {
											enable: true,
											speed: 5,
											minimumValue: 1,
											sync: true,
											startValue: "min",
											destroy: "max",
										},
									},
								},
							},
							attract: {
								distance: 200,
								duration: 0.4,
								easing: "ease-out-back",
								factor: 1,
								maxSpeed: 50,
								speed: 1,
							},
							bounce: {
								distance: 200,
							},
							bubble: {
								distance: 200,
								duration: 0.4,
								mix: false,
								divs: {
									distance: 200,
									duration: 0.4,
									mix: false,
									selectors: [],
								},
							},
							connect: {
								distance: 120,
								links: {
									opacity: 0.5,
								},
								radius: 60,
							},
							grab: {
								distance: 0,
								links: {
									blink: false,
									consent: false,
									opacity: 1,
								},
							},
							push: {
								default: true,
								groups: [],
								quantity: 4,
							},
							remove: {
								quantity: 2,
							},
							repulse: {
								distance: 200,
								duration: 0.4,
								factor: 100,
								speed: 1,
								maxSpeed: 50,
								easing: "ease-out-quad",
								divs: {
									distance: 200,
									duration: 0.4,
									factor: 100,
									speed: 1,
									maxSpeed: 50,
									easing: "ease-out-quad",
									selectors: [],
								},
							},
							slow: {
								factor: 3,
								radius: 200,
							},
							light: {
								area: {
									gradient: {
										start: {
											value: "#ffffff",
										},
										stop: {
											value: "#000000",
										},
									},
									radius: 1000,
								},
								shadow: {
									color: {
										value: "#000000",
									},
									length: 2000,
								},
							},
						},
					},
					particles: {
						number: {
							value: 100,
							density: {
								enable: true,
								value_area: 946.9771699587272,
							},
						},
						color: {
							value: "#00A9FF", //partical color
						},
						shape: {
							type: "circle",
							stroke: {
								width: 0,
								color: "#750E21",
							},
							polygon: {
								nb_sides: 5,
							},
							image: {
								src: "img/github.svg",
								width: 100,
								height: 100,
							},
						},
						opacity: {
							value: 0.5,
							random: false,
							anim: {
								enable: false,
								speed: 1,
								opacity_min: 0.1,
								sync: false,
							},
						},
						size: {
							value: 3,
							random: true,
							anim: {
								enable: false,
								speed: 40,
								size_min: 0.1,
								sync: false,
							},
						},
						line_linked: {
							enable: true,
							distance: 150,
							color: "#F9F9E0", //line color
							opacity: 0.2,
							width: 1,
						},
						move: {
							enable: true,
							speed: 3,
							direction: "none",
							random: true,
							straight: false,
							out_mode: "out",
							bounce: false,
							attract: {
								enable: false,
								rotateX: 600,
								rotateY: 1200,
							},
						},
					},

					pauseOnBlur: true,

					pauseOnOutsideViewport: true,

					smooth: true,

					zLayers: 100,

					motion: {
						disable: false,
						reduce: {
							factor: 4,
							value: true,
						},
					},
				}}
			/>
		</div>
	);
};

export default ParticalBg;
