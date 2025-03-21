import HistoricalLineGraph from '@/Components/Sections/CustomerSections/HistoricalLineGraph.js';
import React, { useEffect, useState } from 'react';
import {Sidenav} from "../../Components/Sections/index.js";

import { getHistoricalData }  from '../../Services/historicalViewServices.js';
import HistoricalFilterForm from '@/Components/Sections/CustomerSections/HistoricalFilterForm.js';
import { HistoricalLineGraphProps } from '@/Components/Sections/CustomerSections/HistoricalLineGraph.js';

const HistoricalViewPage: React.FC = () => {
    
    const [historicalData, setHistoricalData] = useState<HistoricalLineGraphProps['historicalData']>([]);

    useEffect(() => {
        getHistoricalData('month')
          .then(setHistoricalData);
      }, []);

    const handleFormSubmit = (selectedValue:string = 'month', startDate?:string|null, endDate?:string|null) => {
        getHistoricalData(selectedValue, startDate, endDate)
          .then(setHistoricalData);
    };

    return (
        <Sidenav>
        <div className="main-heading">
            <h1>Historical Nutrient Intake</h1>
        </div>
        <HistoricalFilterForm onSubmit={handleFormSubmit}/>
        <HistoricalLineGraph historicalData={historicalData}/>
        </Sidenav>
    );
};

export default HistoricalViewPage;