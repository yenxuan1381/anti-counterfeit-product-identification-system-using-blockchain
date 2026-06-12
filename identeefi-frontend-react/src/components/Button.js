import '../css/Button.css';

const STYLES = ['btn--primary', 'btn--outline', 'btn--long'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    disabled
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize)
        ? buttonSize
        : SIZES[0];

    return (
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize} ${disabled ? 'btn--disabled':''}`}
                onClick={onClick}
                type={type}
                disabled={disabled}
            >
                {children}
            </button>
    );
}