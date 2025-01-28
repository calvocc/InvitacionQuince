import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const WLButton = styled(Button)`
  color: #fff;
  background-color: #686754;
  border: 1px solid #686754;
  :hover {
    color: #686754;
    background-color: #9aa098;
    border: 1px solid #9aa098;
  }
`;

type WLButtonsProps = {
  onClick: () => void;
  label: string;
  icon?: JSX.Element;
};

export default function WLButtons({ onClick, label, icon }: WLButtonsProps) {
  return (
    <WLButton
      variant="contained"
      onClick={onClick}
      startIcon={icon}
      size="medium"
    >
      {label}
    </WLButton>
  );
}
