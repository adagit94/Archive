type DropdownPosition = { left: number | undefined; top: number | undefined };

type ShowDropdownSettings = {
  id: string | number;
  trigger: Element;
  renderContent: () => React.ReactNode;
} & DropdownPosition;

type ShowDropdown = (settings: ShowDropdownSettings) => void;

type HideDropdownSettings = {
  id?: string | number;
};

type HideDropdown = (settings?: HideDropdownSettings) => void;

type SetDropdownPositionSettings = {
  id: string | number;
} & Partial<DropdownPosition>;

type SetDropdownPosition = (settings: SetDropdownPositionSettings) => void;

export type DropdownStore = {
  show: ShowDropdown;
  hide: HideDropdown;
  setPosition: SetDropdownPosition;
  id?: string | number;
  trigger?: Element;
  renderContent?: () => React.ReactNode;
} & DropdownPosition;
