import React, {useEffect, useState} from "react";
import {nonCommDataType} from "../types/tables";
import {fetchNonCommCount, fetchFilteredRefreshReport} from "../services/apiServices";
import GaugeComponent from "./GaugeComponent";

interface gaugeType{
    amr?: string;
    property?: string;
    utility?: string;
    sum_days_4_to_10: number;
    sum_days_10_to_30: number;
    sum_days_30_to_60: number;
    sum_days_60_to_90: number;
    sum_days_90_plus: number;
    total_non: number;
    total_count: number;
}

const TotalView: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [groupBy, setGroupBy] = useState<string>();
    const [totalGauge, setTotalGauge] = useState<gaugeType[]>([{
        total_non: 0,
        total_count: 0,
        sum_days_4_to_10: 0,
        sum_days_10_to_30: 0,
        sum_days_30_to_60: 0,
        sum_days_60_to_90: 0,
        sum_days_90_plus: 0
    }]);
    const [gauge, setGauge] = useState<gaugeType[]>([{
        total_non: 0,
        total_count: 0,
        sum_days_4_to_10: 0,
        sum_days_10_to_30: 0,
        sum_days_30_to_60: 0,
        sum_days_60_to_90: 0,
        sum_days_90_plus: 0
    }]);
    const [error, setError] = useState<string>("");
    const [stackedColumnData, setStackedColumnData] = useState<nonCommDataType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFilteredRefreshReport(1, 100000, {});
                // console.log("Fetched Data:", response);

                setStackedColumnData(response.data);
            } catch (error) {
                setError(error as string);
            }

            try {
                const response: gaugeType[] = await fetchNonCommCount();
                console.log(response, 'this is response');
                setTotalGauge(response);
            } catch (error) {
                setError((prevError) => prevError + ' tota: ' + error);
            }
        }
        fetchData()
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchGroupData = async () => {
            try {
                const response:gaugeType[] = await fetchNonCommCount(groupBy);
                setGauge(response);
            }  catch (error) {
                setError((prevError) => prevError + ' group:' + error);
            }
        }
        if (groupBy !== ''){
            fetchGroupData()
                .then(() => setLoading(false));
        }
    }, [groupBy]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGroupBy(event.target.value);
    };

    if (loading) return <div>loading...</div>;
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <GaugeComponent
                values={[
                    totalGauge[0].sum_days_4_to_10,
                    totalGauge[0].sum_days_10_to_30,
                    totalGauge[0].sum_days_30_to_60,
                    totalGauge[0].sum_days_60_to_90,
                    totalGauge[0].sum_days_90_plus
                ]}
                total_non={totalGauge[0].total_non}
                total_count={totalGauge[0].total_count}
                previous_value={0} />
            <label htmlFor="dropdown">Group By: </label>
            <select
                id="dropdown"
                value={groupBy}
                onChange={handleSelectChange}  // Updates state when an option is selected
            >
                <option value="">--Select--</option>
                <option value="amr">AMR</option>
                <option value="option2">Property Address</option>
                <option value="utility">Utility Type</option>
            </select>

            {/* Display the selected value */}
            <div style={{ marginTop: '10px' }}>
                <strong>Selected: </strong> {groupBy || 'None'}
            </div>
            {/*<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>*/}
            {/*    {gauge.map((item, index) => (*/}
            {/*        <GaugeComponent key={index} value={item.total_non} total_count={item.total_count} delta={0} />*/}
            {/*        // <Card key={index} name={item.name} description={item.description} />*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    )
}

export default TotalView;