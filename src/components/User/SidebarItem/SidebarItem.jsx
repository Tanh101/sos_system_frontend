import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import "./SidebarItem.css"

const SidebarItem = ({ link, icon, title, active, onClick }) => {
    return (
        <div className={`sidebar__menu font-roboto font-medium text-sm py-2`}
            onClick={onClick}>
            <Link className='flex flex-col justify-center items-center' to={link}>
                <button className={`sidebar__item flex flex-col justify-center items-center font-poppins px-4
                    h-12 hover:bg-[#F73334] rounded-xl
                ${active ? 'bg-red-500' : ''}`}>
                    <FontAwesomeIcon className="animation__icon transition ease-in-out delay-50" size="xl" icon={icon}
                        color={active ? '#fff' : 'red'} />
                </button>
                <p>{title}</p>
            </Link>
        </div>
    )
}


SidebarItem.propTypes = {
    link: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func
};

export default SidebarItem
