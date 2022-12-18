import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Register from "./Register";

const ModalDialogRegister = ({ open, handleCloseRegister }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleCloseRegister}>
      {/* form to be created */}
      <Register handleClose={handleCloseRegister} />
    </Dialog>
  );
};

export default ModalDialogRegister;
