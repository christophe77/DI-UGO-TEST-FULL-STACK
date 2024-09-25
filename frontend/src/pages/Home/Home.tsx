import Grid from '@mui/material/Grid2';
import PageCard from '../../components/PageCard/PageCard';
import './Home.css';

type PageCard = {
	image: string;
	title: string;
	description: string;
	link: string;
};
const cards: PageCard[] = [
	{
		image: 'https://display.aero/wp-content/uploads/2023/04/360.jpg',
		title: 'Customers',
		description: 'Check out our happy customers',
		link: '/customers',
	},
];
export default function Home() {
	return (
		<div className="home-container">
			<Grid container spacing={2}>
				{cards.map((card: PageCard) => (
					<Grid key={card.title} size={{ xs: 12 }}>
						<PageCard
							image={card.image}
							title={card.title}
							description={card.description}
							link={card.link}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
}
