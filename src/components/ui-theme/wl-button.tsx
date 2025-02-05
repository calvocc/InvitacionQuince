import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const WLButton = styled(Button)<{ colorLight?: boolean }>`
  font-family: "Poppins", serif;
  font-weight: 600;
  color: ${({ colorLight }) => (colorLight ? "#686754" : "#fff")};
  background-color: ${({ colorLight }) => (colorLight ? "#fff" : "#686754")};
  border: 1px solid ${({ colorLight }) => (colorLight ? "#fff" : "#686754")};
  padding: 2px 16px;
  :hover {
    color: ${({ colorLight }) => (colorLight ? "#686754" : "#fff")};
    background-color: ${({ colorLight }) =>
      colorLight ? "#9aa098" : "#9aa098"};
    border: 1px solid
      ${({ colorLight }) => (colorLight ? "#9aa098" : "#9aa098")};
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
