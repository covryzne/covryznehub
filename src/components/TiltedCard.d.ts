import type { CSSProperties, MouseEvent, ReactNode } from "react";

type TiltedCardProps = {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string | number;
  containerWidth?: string | number;
  imageHeight?: string | number;
  imageWidth?: string | number;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  glare?: number;
  shadow?: number;
  radius?: number;
  gyroscope?: boolean;
  intro?: boolean;
  introDelay?: number;
  showTooltip?: boolean;
  flipOnClick?: boolean;
  flipped?: boolean;
  backContent?: ReactNode;
  children?: ReactNode;
  onSurfaceClick?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
};

export default function TiltedCard(props: TiltedCardProps): ReactNode;
export function TiltedCardLayer(props: { depth?: number; className?: string; style?: CSSProperties; children?: ReactNode }): ReactNode;
