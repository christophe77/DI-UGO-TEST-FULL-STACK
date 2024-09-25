import './Description.css';

interface IDescriptionProps {
	description: string;
}

export default function Description({ description }: IDescriptionProps) {
	return <h4 className='description'>{description}</h4>;
}
