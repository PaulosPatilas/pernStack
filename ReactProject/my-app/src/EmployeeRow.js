import React from 'react';
import TableCell from '@mui/material/TableCell';
import moment from 'moment';


function EmployeeRow(props) {
     
    return(
        <>
            <TableCell>{props?.LastName}</TableCell>
            <TableCell>{props?.FirstName}</TableCell>
            <TableCell style={{align:'center'}}>{moment(props?.BirthDate).format("DD-MM-YYYY")}</TableCell>
            <TableCell>{props?.is_active ? 'Yes' : 'No'}</TableCell>
        </>                 
    )

}
export default EmployeeRow
