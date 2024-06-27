import React from 'react'
import { useTranslation } from 'react-i18next'

const Statistic = () => {
    const { t } = useTranslation();
    
    return (
        <div className="flex justify-center items-center h-96">
            <p className="text-2xl">{t("Thống kê")}</p>
        </div>
    )
}

export default Statistic
