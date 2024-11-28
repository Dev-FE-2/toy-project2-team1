export interface ToggleButtonProps {
	$isOpen: boolean;
}

export interface LeftSectionProps {
	$isOpen: boolean;
}

export interface RightSectionProps {
	$isLeftOpen: boolean;
}

export const TOGGLE_BUTTON_TEXT = {
	OPEN: '>>',
	CLOSE: '<<',
} as const;

export type ToggleButtonTextType = (typeof TOGGLE_BUTTON_TEXT)[keyof typeof TOGGLE_BUTTON_TEXT];
