import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
	const navigate = useNavigate();
	const pages = ['customers'];
	const currentPage = '';
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleChangePage = (page: string) => {
		handleCloseNavMenu();
		navigate(`/${page}`);
	};
	return {
		anchorElNav,
		handleOpenNavMenu,
		handleChangePage,
		handleCloseNavMenu,
		pages,
		currentPage,
	};
};

export default useNavigation;
