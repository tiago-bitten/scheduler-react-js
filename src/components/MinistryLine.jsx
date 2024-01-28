import React from 'react';
import { Edit, Delete } from '@mui/icons-material';

import MinistryBox from './MinistryBox';

const MinistryLine = ({ ministry }) => {
    return (
        <tr className="border-b">
            <td className="text-center p-2">
                <MinistryBox name={ministry.name} color={ministry.color} />
            </td>
            <td className="text-left p-10">{ministry.description}</td>
            <td className="text-center font-bold text-quinary p-10">{ministry.totalVolunteers}</td>
            <td className="text-right p-10">
                <Edit className="text-quinary cursor-pointer mx-2" />
                <Delete className="text-quinary cursor-pointer mx-2" />
            </td>
        </tr>
    );
};

export default MinistryLine;
