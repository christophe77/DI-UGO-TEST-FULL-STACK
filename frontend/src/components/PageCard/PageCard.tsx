import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Title from '../Title/Title';
import Description from '../Description/Description';
import './PageCard.css';

interface IPageCardProps {
	image: string;
	title: string;
	description: string;
	link: string;
}
export default function PageCard({
	image,
	title,
	description,
	link,
}: IPageCardProps) {
	const navigate = useNavigate();
	return (
		<Card>
			<CardMedia className="card-media" image={image} title={title} />
			<CardContent>
				<Title title={title} />
				<Description description={description} />
			</CardContent>
			<CardActions>
				<Button size="small" onClick={() => navigate(link)}>
					Open
				</Button>
			</CardActions>
		</Card>
	);
}
