import React from 'react';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';
import {useTranslation} from "react-i18next";
import Badge from '@material-ui/core/Badge';

export function ChangeLanguageButton({className}) {

    const {i18n} = useTranslation();

    const handleChangeLanguage = () => {
        if (i18n.language === 'ru') {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('ru');
        }
    };

    return (
        <IconButton className={className}>
            <Badge badgeContent={i18n.language} color="primary" overlap="circle">
                <LanguageIcon onClick={handleChangeLanguage}/>
            </Badge>
        </IconButton>

    )

}