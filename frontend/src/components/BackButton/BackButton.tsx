import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ChevronLeftOutlined';
import { useNavigate } from 'react-router-dom';

interface IBackButton {
	link: string;
}
export default function BackButton({ link }: IBackButton) {
	const navigate = useNavigate();
	return (
		<IconButton aria-label="back" onClick={() => navigate(link)}>
			<BackIcon /> Back
		</IconButton>
	);
}
