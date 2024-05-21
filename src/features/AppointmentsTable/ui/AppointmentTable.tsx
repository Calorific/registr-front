'use client'
import React, {useEffect, useState} from 'react';
import {CustomTable, ITableParams} from "@/shared/CustomTable";
import {defaultAppointmentSelectedColumns} from "@/features/AppointmentsTable/config/defaultAppointmentSelectedColumns";
import {AppointmentColumns} from "@/features/AppointmentsTable/config/AppointmentColumns";
import {IAppointmentTableData} from "@/features/AppointmentsTable/model/IAppointmentTableData";
import {availableAppointmentColumns} from "@/features/AppointmentsTable/config/availableAppointmentColumns";


interface props {
    tableParams: ITableParams
    setTableParams(data: ITableParams): void
    data: IAppointmentTableData
}
const AppointmentTable = ({tableParams, setTableParams, data}: props) => {
    const [selectedColumns, setSelectedColumns] = useState<string[]>(defaultAppointmentSelectedColumns)

    useEffect(() => {
        localStorage.setItem("appointmentsSelectedColumns", selectedColumns.toString())
    }, [selectedColumns]);

    return (
        <CustomTable
            baseColumns={AppointmentColumns}
            availableColumns={availableAppointmentColumns}
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
            data={data}
            tableParams={tableParams}
            setTableParams={setTableParams}
            getRecordLink={(recordId)=> `/appointments/${recordId}/generalDetails`}
        />
    );
};

export default AppointmentTable;