import React, {useEffect, useRef, useState} from "react";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import {TodolistItem} from "./todolistItem";
import {createTodolistItems, getTodolistItems, selectItems, selectPageCount, setSearchString} from "./todolistSlice";
import {useDispatch, useSelector} from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import debounce from 'lodash/debounce';
import {useTranslation} from 'react-i18next';
import {ChangeLanguageButton} from "./language";
import {SummaryForm} from "./summary";


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    changeLanguageButton: {
        position: 'absolute',
        top: 5,
        right: 10
    },
    '@media screen and (max-width: 400px)': {
        changeLanguageButton: {
            position: 'absolute',
            right: 0
        },
    },
    listItems: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 440,
        flexWrap: 'wrap'
    }


}));


export function Todolist() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef(null);
    const items = useSelector(selectItems);
    const pageCount = useSelector(selectPageCount);

    const [page, setPage] = React.useState(1);

    const handlePageChange = (event, page) => {
        setPage(page);
    };

    const handleSearchButtonClick = (event) => {
        setIsSearchOpen(true);

        setTimeout(() => {
            inputRef.current.focus();
        }, 500)
    };

    useEffect(() => {
        dispatch(getTodolistItems({page}));
    }, [dispatch, page]);

    const handleSearchString = debounce(event => {
            dispatch(setSearchString({searchString: event.target.value}));
            if (page === 1) {
                dispatch(getTodolistItems({page}))
            } else {
                setPage(1)

            }
        },
        500
    );

    const handleAddItem = () => {
        dispatch(createTodolistItems());
    };
    const {t} = useTranslation();

    return (
        <>
            <div className={classes.headerContainer}>
                {
                    isSearchOpen && (
                        <TextField onChange={handleSearchString}
                                   className={classes.margin}
                                   inputRef={inputRef}
                                   placeholder={t('Search')}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment>
                                               <SearchIcon/>
                                           </InputAdornment>
                                       ),
                                   }}/>
                    )
                }
                {
                    !isSearchOpen && (
                        <IconButton>
                            <SearchIcon onClick={handleSearchButtonClick}/>
                        </IconButton>
                    )
                }
                <ChangeLanguageButton className={classes.changeLanguageButton}/>
            </div>
            <div className={classes.listItems}>
                <div>
                    {
                        items.map((item) => {
                            return (
                                <TodolistItem key={item.id} item={item}/>
                            )
                        })
                    }
                </div>

                <div>
                    <SummaryForm/>
                </div>
            </div>
            <div>
                <Pagination className={classes.pagination} count={pageCount} page={page} onChange={handlePageChange}
                            color="primary"/>
                <Fab color="primary" aria-label="add">
                    <AddIcon color="secondary" onClick={handleAddItem}/>
                </Fab>
            </div>
        </>


    )
}