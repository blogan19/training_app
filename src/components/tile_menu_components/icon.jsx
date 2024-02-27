import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';



export default function IconDisplay({icon}) {
    return (
        <Box justifyContent="center" sx={{display:'flex', width: '100%', alignItems: 'center', mt: 3, fontSize: '5em' }}>
            <i className={icon}></i>
        </Box>
    )
}


