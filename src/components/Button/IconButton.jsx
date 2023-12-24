import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { IoIosAdd } from "react-icons/io";

const IconButton = ({
	className = "",
	onClick,
	onChange,
	handleSubmit,
	buttonType = "button",
	disabled = false,
	children,
	icon: IconComponent = IoIosAdd, // Default to IoIosAdd if no icon is provided
}) => {
	return (
		<Button
			type={buttonType}
			className={`px-6 py-3 bg-color-button text-color-text hover:bg-color-buttonHover rounded-none active:bg-color-button capitalize text-md flex gap-2 ${className} ${
				disabled && "cursor-not-allowed"
			}`}
			onClick={onClick}
			onChange={onChange}
			onSubmit={handleSubmit}
			disabled={disabled}
		>
			<IconComponent className="w-6 h-6" />
			{children}
		</Button>
	);
};

IconButton.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	handleSubmit: PropTypes.func,
	buttonType: PropTypes.oneOf(["button", "submit", "reset"]),
	disabled: PropTypes.bool,
	children: PropTypes.node.isRequired,
	icon: PropTypes.elementType, // Accept any React element type as an icon
};

export default IconButton;
