import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

const PrimaryButton = ({
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
			type={buttonType}
			className={`px-6 py-3 bg-color-button text-color-text hover:bg-color-buttonHover rounded-none  active:bg-color-button capitalize text-md animation-button ${className}  ${
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

PrimaryButton.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	handleSubmit: PropTypes.func,
	buttonType: PropTypes.oneOf(["button", "submit", "reset"]),
	disabled: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default PrimaryButton;
