import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Notification = ({ count }) => {
    return (
        <IconButton aria-label="Notifications">
            <Badge badgeContent={count} color="error">
                <FontAwesomeIcon color='slate-400' icon={faBell} onClick={()  => console.log('toggle')} />
            </Badge>
        </IconButton>
    );
}

Notification.propTypes = {
    count: PropTypes.number.isRequired,
};

export default Notification;
