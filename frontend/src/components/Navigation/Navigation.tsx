import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../assets/logo.png';
import useNavigation from './useNavigation';
import './Navigation.css';

export default function Navigation() {
	const {
		anchorElNav,
		handleOpenNavMenu,
		handleChangePage,
		pages,
		currentPage,
		handleCloseNavMenu,
	} = useNavigation();

	return (
		<AppBar position="static" className="navigation-appbar">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box className="left-box" onClick={() => handleChangePage('')}>
						<img src={Logo} height="50px" alt="logo" />
					</Box>
					<Box
						className="right-box"
						sx={{ display: { xs: 'none', sm: 'flex' } }}
					>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={() => handleChangePage(page)}
								disabled={currentPage === page}
							>
								<span className="page-button-text">{page}</span>
							</Button>
						))}
					</Box>
					<Box
						className="right-box"
						sx={{ display: { xs: 'flex', sm: 'none' } }}
					>
						<IconButton
							size="large"
							aria-label="burger menu"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon sx={{ color: '#1b2032' }} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', sm: 'none' } }}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={() => handleChangePage(page)}
									disabled={currentPage === page}
								>
									<span className="page-title">{page}</span>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
