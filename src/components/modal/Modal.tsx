import * as S from './Modal.styles';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { Button } from '../button/Button';

type Message = {
	confirm: string;
	leftBtn: string;
	rightBtn: string;
};

interface ModalProps {
	onClose: () => void;
	children?: React.ReactNode;
}

interface ConfirmModalProps {
	onClose: () => void;
	message: Message;
	color?: string;
	onClickLeftBtn: () => void;
	onClickRightBtn: () => void;
}

export function Modal({ onClose, children }: ModalProps) {
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		<S.Overlay onClick={handleOverlayClick}>
			<S.ModalContent>
				<button className="closeBtn" onClick={onClose}>
					<IoCloseOutline />
				</button>
				{children}
			</S.ModalContent>
		</S.Overlay>
	);
}

/*
  사용
  type Message = {
  confirm: string;
  leftBtn: string;
  rightBtn: string;
};

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const message: Message = {
    confirm: '급여 정정을 승인하시겠습니까?',
    leftBtn: '네',
    rightBtn: '아니오'
  }

  {
    isConfirmModalOpen &&
    <ConfirmModal
      onClose={closeConfirmModal}
      message={message}
      color={'green-light'}
      onClickLeftBtn={test}
      onClickRightBtn={test}
    />
  }
*/

export function ConfirmModal({
	onClose,
	message,
	color = 'gray',
	onClickLeftBtn,
	onClickRightBtn,
}: ConfirmModalProps) {
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		<S.Overlay onClick={handleOverlayClick}>
			<S.ConfirmModalContent>
				<button className="closeBtn" onClick={onClose}>
					<IoCloseOutline />
				</button>
				{/* <QuestionIcon fill={`var(--color-${color}-dark)`} /> */}
				<FaRegQuestionCircle
					style={{ color: `var(--color-${color}-dark)` }}
					className="queistionIcon"
				/>
				<p>{message.confirm}</p>
				<Button className="firstBtn" color={`${color}-dark`} shape="line" onClick={onClickLeftBtn}>
					{message.leftBtn}
				</Button>
				<Button color={`${color}`} shape="line" onClick={onClickRightBtn}>
					{message.rightBtn}
				</Button>
			</S.ConfirmModalContent>
		</S.Overlay>
	);
}
