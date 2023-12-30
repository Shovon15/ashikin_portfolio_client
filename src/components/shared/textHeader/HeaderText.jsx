/* eslint-disable react/prop-types */

const HeaderText = ({ className, children }) => {
	return (
		<p
			className={`${className} text-center font-bold text-3xl md:text-4xl text-color-header capitalize animation-header`}
		>
			{children}
		</p>
	);
};

export default HeaderText;
