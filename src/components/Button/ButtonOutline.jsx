import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ButtonOutline = ({
	className = "",
	onClick,
	onChange,
	handleSubmit,
	buttonType = "button",
	disabled = false,
	children,
}) => {
	return (
		<Button
			variant="text"
			type={buttonType}
			className={`px-6 py-2 bg-inherit text-color-secondary hover:bg-color-buttonHover rounded-none hover:text-white ring-1 ring-color-buttonRing active:bg-color-button capitalize text-md ${className}  ${
				disabled && "cursor-not-allowed"
			}`}
			onClick={onClick}
			onChange={onChange}
			onSubmit={handleSubmit}
			disabled={disabled}
		>
			{children}
		</Button>
	);
};

ButtonOutline.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	handleSubmit: PropTypes.func,
	buttonType: PropTypes.oneOf(["button", "submit", "reset"]),
	disabled: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default ButtonOutline;
