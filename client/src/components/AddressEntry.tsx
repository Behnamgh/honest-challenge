import React, { useState, ChangeEvent, useEffect } from "react";
import { TextField } from "@material-ui/core";

interface IProps {
    addressName: string;
    changeAddress: React.Dispatch<React.SetStateAction<string>>;
}
const AddressEntry = (props: IProps) => {
    const { addressName, changeAddress} = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeAddress(event.target.value);
    };

    return (<div className="AddressEntry">
        <TextField
            id="outlined-name"
            label="Name"
            value={addressName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
        />
    </div>);
};

export default AddressEntry;
