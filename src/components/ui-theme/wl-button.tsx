import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const WLButton = styled(Button)<{ colorLight?: boolean }>`
  font-family: "Poppins", serif;
  font-weight: 600;
  color: ${({ colorLight }) => (colorLight ? "#a251fb" : "#fff")};
  background-color: ${({ colorLight }) => (colorLight ? "#fff" : "#a251fb")};
  border: 1px solid ${({ colorLight }) => (colorLight ? "#fff" : "#a251fb")};
  padding: 2px 16px;
  :hover {
    color: ${({ colorLight }) => (colorLight ? "#a251fb" : "#fff")};
    background-color: ${({ colorLight }) =>
      colorLight ? "#D398F9" : "#D398F9"};
    border: 1px solid
      ${({ colorLight }) => (colorLight ? "#D398F9" : "#D398F9")};
  }
`;

type WLButtonsProps = {
  label: string;
  icon?: JSX.Element;
  colorLight?: boolean;
};

export default function WLButtons({
  onClick,
  label,
  icon,
  colorLight,
  ...props
}: WLButtonsProps & React.ComponentProps<typeof Button>) {
  return (
    <WLButton
      variant="contained"
      onClick={onClick}
      startIcon={icon}
      size="medium"
      colorLight={colorLight}
      {...props}
    >
      {label}
    </WLButton>
  );
}
