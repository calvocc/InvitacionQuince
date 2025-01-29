import { styled } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";

const WLText = styled(Typography)<
  TypographyProps & { color?: string; weight?: number }
>`
  font-family: "Poppins", serif;
  color: ${({ color }) => (color ? color : "#242522")};
  font-weight: ${({ weight }) => (weight ? weight : 400)};
`;

type WLTextsProps = TypographyProps & {
  children: React.ReactNode;
  color?: string;
  weight?: number;
};

export default function WLTexts({ children, color, ...props }: WLTextsProps) {
  return (
    <WLText {...props} color={color}>
      {children}
    </WLText>
  );
}
