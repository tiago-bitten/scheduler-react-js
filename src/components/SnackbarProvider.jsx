import React from 'react';
import { Snackbar } from '@mui/material';

const SnackbarContext = React.createContext();

export const useSnackbar = () => React.useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [messageInfo, setMessageInfo] = React.useState(null);

    const enqueueSnackbar = (message) => {
        setMessageInfo({ message, key: new Date().getTime() });
    };

    const handleClose = (event, reason) => {
        if (reason !== 'clickaway') {
            setMessageInfo(null);
        }
    };

    return (
        <SnackbarContext.Provider value={enqueueSnackbar}>
            {children}
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                open={messageInfo != null}
                autoHideDuration={4000}
                onClose={handleClose}
                message={messageInfo ? messageInfo.message : undefined}
            />
        </SnackbarContext.Provider>
    );
};
