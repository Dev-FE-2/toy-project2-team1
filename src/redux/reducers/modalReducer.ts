import { SET_MODAL_OPEN } from '../actionTypes';
import { TModalState } from '@/types/modal';

const initialState: TModalState = {
	isModalOpen: false,
};

export default function ModalReducer(state: TModalState = initialState, action: any): TModalState {
	switch (action.type) {
		case SET_MODAL_OPEN:
			return { ...state, isModalOpen: action.payload };
		default:
			return state;
	}
}
