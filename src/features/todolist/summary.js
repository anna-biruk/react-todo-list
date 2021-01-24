import React, {useEffect} from "react";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from "react-redux";
import {Chart} from "react-google-charts";
import {
    getCheckedItems,
    selectCheckedCount,
    selectOverallCount,
    selectUncompletedCount
} from "./todolistSlice";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 25,
        marginLeft: 70,
        display: 'flex',
    },

}));
const pieOptions = {
    title: "",
    pieHole: 0.6,
    slices: [
        {
            color: "#2BB673"
        },
        {
            color: "#d91e48"
        },
        {
            color: "#007fad"
        },
        {
            color: "#e9a227"
        }
    ],
    legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
            color: "#000000",
            fontSize: 14
        }
    },
    tooltip: {
        showColorCode: true
    },
    chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
    },
    fontName: "Roboto"
};


export function SummaryForm({item}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const checkedCount = useSelector(selectCheckedCount);
    const uncompletedCount = useSelector(selectUncompletedCount);
    const overallCount = useSelector(selectOverallCount);

    useEffect(() => {
        dispatch(getCheckedItems())
    }, [dispatch]);

    const {t} = useTranslation();

    return (
        <List className={classes.root}>
            <div className={classes.checkedItem}>
                <ListItem>
                    <ListItemText primary={<div>{t('Completed')}: {checkedCount}</div>}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary={<div>{t('Uncompleted')}: {uncompletedCount}</div>}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary={<div>{t('Overall')}: {overallCount}</div>}/>
                </ListItem>
            </div>
            <div>
                <Chart
                    width={'230px'}
                    height={'230px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    options={{
                        legend: 'none',
                        pieSliceText: 'label',
                        backgroundColor: 'transparent',
                        slices: [

                            {
                                color: '#996ad3'
                            },
                            {
                                color: "#d91e48"
                            },
                            {
                                color: "#e9a227"
                            }
                        ],
                        tooltip: {
                            showColorCode: true
                        },
                    }}
                    data={[
                        ['Status', 'Items'],
                        [t('Completed'), Number.parseInt(checkedCount)],
                        [t('Uncompleted'), Number.parseInt(uncompletedCount)],
                    ]}
                    rootProps={{'data-testid': '1'}}
                />
            </div>
        </List>
    )


}