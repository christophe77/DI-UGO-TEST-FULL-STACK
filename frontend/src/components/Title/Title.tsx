import './Title.css';

interface ITitleProps {
	title: string;
}

export default function Title({ title }: ITitleProps) {
	return <h3 className='title'>{title}</h3>;
}
