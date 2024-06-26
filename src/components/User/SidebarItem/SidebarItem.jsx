import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import "./SidebarItem.css"

const SidebarItem = ({ userCount, link, icon, title, active, onClick, isShow }) => {
    const { t } = useTranslation();

    return (
        <div className={`sidebar__menu font-roboto font-medium text-sm my-1 ${isShow ? 'hover:bg-slate-100' : ''} w-full rounded-lg py-1`}
            onClick={onClick}>
            <Link className={`flex ${isShow ? 'justify-start' : 'justify-center'} items-center`} to={link}>
                <button className={`sidebar__item flex flex-col justify-center items-center font-poppins px-4 w-14
                    h-12 hover:bg-[#F73334] rounded-xl
                ${active ? 'bg-red-500' : ''}`}>
                    {link === '/messages' ? (
                        <Badge badgeContent={userCount?.unviewedMessages} color="warning">
                            <FontAwesomeIcon className="animation__icon transition ease-in-out delay-50" size="lg" icon={icon}
                                color={active ? '#fff' : 'red'}
                            />
                        </Badge>
                    ) : (
                        <FontAwesomeIcon className="animation__icon transition ease-in-out delay-50" size="xl" icon={icon}
                            color={active ? '#fff' : 'red'} />
                    )}
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
