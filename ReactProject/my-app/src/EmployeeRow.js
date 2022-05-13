import React from 'react';
import TableCell from '@mui/material/TableCell';
import Moment from 'react-moment';


function EmployeeRow(props) {
     
    return(
        <>
            <TableCell>{props?.LastName}</TableCell>
            <TableCell>{props?.FirstName}</TableCell>
            <Moment format='DD/MM/YYYY'><TableCell align='center'>{props?.BirthDate}</TableCell></Moment>
            <TableCell>{props?.is_active ? 'Yes' : 'No'}</TableCell>
        </>                 
    )

}
export default EmployeeRow
