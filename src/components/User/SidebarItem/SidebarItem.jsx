import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import "./SidebarItem.css"
import { useTranslation } from 'react-i18next'

const SidebarItem = ({ link, icon, title, active, onClick, isShow }) => {
    const { t } = useTranslation();
    
    return (
        <div className={`sidebar__menu font-roboto font-medium text-sm my-1 ${isShow ? 'hover:bg-slate-100' : ''} w-full rounded-lg py-1`}
            onClick={onClick}>
            <Link className={`flex ${isShow ? 'justify-start' : 'justify-center'} items-center`} to={link}>
                <button className={`sidebar__item flex flex-col justify-center items-center font-poppins px-4 w-14
                    h-12 hover:bg-[#F73334] rounded-xl
                ${active ? 'bg-red-500' : ''}`}>
                    <FontAwesomeIcon className="animation__icon transition ease-in-out delay-50" size="xl" icon={icon}
                        color={active ? '#fff' : 'red'} />
                </button>
                {isShow && <p className='mx-4'>{t(title)}</p>}
            </Link>
        </div >
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
