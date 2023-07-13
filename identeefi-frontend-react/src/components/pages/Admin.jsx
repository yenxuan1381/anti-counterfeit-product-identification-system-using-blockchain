import '../../css/Role.css'
import { LinkButton } from '../LinkButton';
import { Box, Button as Btn } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Admin = () => {
    return (
        <div className="role-container">
            <div className="role-container-box">

                <Box
                    sx={{                        
                        position: 'absolute',
                        top: 20,
                        right: 20,
                    }}
                >
                    <Btn href="/login" endIcon={<LogoutIcon />}>Logout</Btn>                    
                </Box>

                <h2>Welcome:</h2>
                <h1>ADMIN</h1>
                <LinkButton to="/add-account" className="btns" buttonStyle='btn--long' buttonSize='btn--large'>Add Account</LinkButton>
                <LinkButton to="/manage-account" className="btns" buttonStyle='btn--long' buttonSize='btn--large'>Manage Accounts</LinkButton>

            </div>
        </div>
    );
}

export default Admin;