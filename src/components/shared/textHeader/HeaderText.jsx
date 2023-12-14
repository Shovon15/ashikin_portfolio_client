/* eslint-disable react/prop-types */
const HeaderText = ({ className, children }) => {
	return (
		<p className={`${className} text-center font-bold text-4xl text-textPrimary pb-5`}>
			{children}
		</p>
	);
};

export default HeaderText;
