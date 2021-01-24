import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#996ad3',
        },
        secondary:{
            main: '#fff'
        }
    },
    typography: {
        fontSize: 15,
        fontFamily: 'Raleway',
        fontWeight: 500,
    },
    overrides: {
        MuiPaginationItem: {
            root: {
                fontSize: '1.3rem'
            },
            textPrimary: {
                color: 'black'
            }
        },

        MuiButton: {
            root: {},
        },
        MuiListItem: {
            container: {
                backgroundColor: 'white',
                borderRadius: 37
            },
            gutters: {
                backgroundColor: 'white',
                borderRadius: 37
            }
        },
        MuiFab: {
            label: {
                color: 'black'
            }
        },
        MuiInput: {
            root: {
                opacity:'50%',
            backgroundColor: 'white',
                borderRadius:30,
                height: 45
            },
            underline: {
                '&::before': {
                    display: 'none'
                },
                '&::after': {
                    display: 'none'
                }
            }
        },
        MuiMenu: {
            list:{
                display: 'flex',
                flexDirection: 'row',
                height:60
            }
        },
        MuiSvgIcon:{
            secondary:{
                color:'white'
            }
        }


    },
});