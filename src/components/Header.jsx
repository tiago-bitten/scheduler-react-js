import React from 'react';
import { Person, Notifications } from '@mui/icons-material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Badge } from '@mui/material';
import NacoesImg from '../assets/melhorada.png';
import { useNavigate } from 'react-router-dom';
import instance from '../config/axiosConfig';
import { useSnackbar } from 'notistack';

const itemsStyle = {
    cursor: 'pointer',
    mx: 2,
    px: 2,
    '&:hover': {
        bgcolor: '#718FE9'
    },
    fontSize: '1.2rem',
    borderRadius: '9px',
};

const Header = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [token] = React.useState(sessionStorage.getItem('token'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [usersCount, setUsersCount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await instance.get('/users/approve', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setUsersCount(response.data.users.length);
                }
            } catch (err) {
                if (err.response?.status === 401) {
                    navigate('/entrar');
                }
            }
        }

        fetchUsers();
    }, [usersCount]);

    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMinistries = () => {
        navigate('/ministerios');
    }

    const handleVolunteers = () => {
        navigate('/voluntarios');
    }

    const handleGroups = () => {
        navigate('/grupos');
    }

    const handleAgendas = () => {
        navigate('/agendas');
    }

    const handleNotifications = () => {
        navigate('/aprovar-contas');
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        handleCloseMenu();
        navigate('/entrar');
        enqueueSnackbar('Para entrar, faça login novamente', { variant: 'warning' });
    };

    return (
        <AppBar position="static" sx={{ display: 'flex', justyContent: 'center', bgcolor: '#4169E1', height: '100px' }}>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', height: '100%', mx: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={NacoesImg} alt="Nacoes" className="w-12 h-14" />
                    <Box sx={{ display: 'flex', ml: 2 }}>
                        <Typography sx={itemsStyle} onClick={handleVolunteers}>Voluntários</Typography>
                        <Typography sx={itemsStyle} onClick={handleGroups}>Grupos</Typography>
                        <Typography sx={itemsStyle} onClick={handleMinistries}>Ministérios</Typography>
                        <Typography sx={itemsStyle} onClick={handleAgendas}>Agendas</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    {user?.isSuperUser &&
                        <Box sx={{ mx: 2 }}>
                            <Tooltip title="Aprovar contas">
                                <IconButton sx={{ color: 'white' }} onClick={handleNotifications}>
                                    <Badge badgeContent={usersCount} color="error" max={99}>
                                        <HowToRegIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                    <Box sx={{ ml: 2 }}>
                        <Tooltip title="Perfil">
                            <IconButton sx={{ color: 'white' }} onClick={handleMenu}>
                                <Person />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ top: '35px' }}
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleCloseMenu} sx={{ fontSize: '1rem' }}>Minha conta</MenuItem>
                            <MenuItem onClick={handleCloseMenu} sx={{ fontSize: '1rem' }}>Meus ministérios</MenuItem>
                            <MenuItem onClick={handleLogout} sx={{ fontSize: '1rem' }}>Sair</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
