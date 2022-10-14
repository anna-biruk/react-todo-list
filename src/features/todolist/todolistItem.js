import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from "react-redux";
import clsx from 'clsx';
import dayjs from 'dayjs';
import {
    deleteTodolistItem,
    getCheckedItems,
    handleToggle,
    toggleItemEditing,
    updateTodolistItems
} from "./todolistSlice";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {ReactComponent as High} from "../../assets/icons/high.svg";
import {ReactComponent as Low} from "../../assets/icons/low.svg";
import {ReactComponent as Medium} from "../../assets/icons/medium.svg";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 1600,
    },
    listItemContainer: {
        width: 350,
        display: 'flex',
        justifyContent: 'space-around'
    },
    crossedOut: {
        textDecoration: 'line-through'
    },
    formSubmit: {
        width: '100%',
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(1),
        width: 125,
        marginLeft: 'auto !important'

    },
    actions: {
        display: 'contents'
    }


}));

export function TodolistItem({item}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState(item.name);
    const [importance, setImportance] = useState(item.importance);


    const handleNameChange = event => {
        setName(event.target.value)
    };

    const handleCheckedImportance = event => {
        setImportance(Number.parseInt(event.target.value))
    };

    const handleSaveClick = id => (e) => {
        e.preventDefault();
        dispatch(toggleItemEditing(id));
        dispatch(updateTodolistItems({id, name, isEditing: false, importance}))
    };
    const handleDeleteItem = id => () => {
        dispatch(deleteTodolistItem({id}))
    };
    const handleCheckedItem = id => () => {
        dispatch(handleToggle({id, isChecked: !item.isChecked}));
        dispatch(updateTodolistItems({id, isChecked: !item.isChecked}));
        setTimeout(() => {
            dispatch(getCheckedItems());
        }, 500)
    };

    let date = dayjs(item.createdAt).format('MMM D, YYYY  HH:mm');
    const {t} = useTranslation();

    return (
        <>
            <List className={classes.root}>
                <ListItem className={classes.listItemContainer}>
                    <ListItemIcon>
                        <Checkbox
                            onClick={handleCheckedItem(item.id)}
                            checked={item.isChecked}
                            color='primary'

                        />
                    </ListItemIcon>

                    {!item.isEditing ? (
                        <>
                            <ListItemText primary={item.name} className={clsx({
                                [classes.crossedOut]: item.isChecked
                            })} secondary={date}/>
                            <ListItemSecondaryAction className={classes.actions}>
                                {
                                    importance === 1 && (
                                        <High width={30} height={30}/>
                                    )
                                }
                                {
                                    importance === 2 && (
                                        <Medium width={30} height={30}/>
                                    )
                                }
                                {
                                    importance === 3 && (
                                        <Low width={30} height={30}/>
                                    )
                                }
                                <IconButton edge="end" aria-label="edit">
                                    <EditIcon onClick={handleSaveClick(item.id)}/>
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                    <ClearIcon onClick={handleDeleteItem(item.id)}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </>
                    ) : (
                        <form className={classes.formSubmit} onSubmit={handleSaveClick(item.id)}>
                            <TextField autoComplete='on' value={name} onChange={handleNameChange}/>
                            <FormControl className={classes.formControl}>
                                <Select native defaultValue={2} value={importance} onChange={handleCheckedImportance}>
                                    <option value={1}>{t('High')}</option>
                                    <option value={2}>{t('Medium')}</option>
                                    <option value={3}>{t('Low')}</option>
                                </Select>
                            </FormControl>
                            <IconButton type="submit" autoComplete='on' edge="end">
                                <CheckIcon/>
                            </IconButton>
                        </form>
                    )}
                </ListItem>
            </List>
        </>
    )
}