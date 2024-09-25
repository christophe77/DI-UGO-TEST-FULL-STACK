import CircularProgress from '@mui/material/CircularProgress';
import './LoadingSpinner.css';

export default function LoadingSpinner() {
	return (
		<div className="loading-container">
			<div className="loading-spinner">
				<CircularProgress color="inherit" />
			</div>
		</div>
	);
}
