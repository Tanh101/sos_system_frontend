import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ count }) => {
    return (
        <IconButton aria-label="Notifications">
            <Badge badgeContent={count} color="error">
                <FontAwesomeIcon icon={faBell} />
            </Badge>
        </IconButton>
    );
}

export default Notification;
