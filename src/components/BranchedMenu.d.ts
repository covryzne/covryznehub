import type { ReactElement } from "react";

type MenuItem = {
  value: string;
  label: string;
  icon?: ReactElement;
};

type MenuSection = { label: string; children: MenuItem[] } | MenuItem;

type Props = {
  items: MenuSection[];
  active?: string;
  defaultActive?: string;
  defaultOpen?: number | number[];
  onSelect?: (value: string, item: MenuItem) => void;
  color?: string;
  accentColor?: string;
  lineColor?: string;
  width?: number;
  rowHeight?: number;
  indent?: number;
  trunk?: number;
  radius?: number;
  lineWidth?: number;
  fontSize?: number;
  drawDuration?: number;
  foldDuration?: number;
  className?: string;
};

export default function BranchedMenu(props: Props): ReactElement;
