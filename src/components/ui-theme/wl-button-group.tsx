import { styled } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";

const WLButtonGroupStyle = styled(ButtonGroup)`
  button {
    svg {
      font-size: 1rem;
      fill: #686754;
    }
  }
`;

type WLButtonGroupProps = {
  children: JSX.Element;
};

export default function WLButtonGroup({ children }: WLButtonGroupProps) {
  return <WLButtonGroupStyle variant="outlined">{children}</WLButtonGroupStyle>;
}
