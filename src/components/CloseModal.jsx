import React from "react";
import { IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";

const CloseModal = ({ onClose }) => {
    return (
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Close />
        </IconButton>
    );
};

export default CloseModal;