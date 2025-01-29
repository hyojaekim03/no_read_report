import React, {useEffect, useState} from "react";
import {nonCommDataType} from "../types/tables";
import {fetchNonCommReport} from "../services/apiServices";

const TotalView: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [stackedColumnData, setStackedColumnData] = useState<nonCommDataType[]>([]);
    useEffect(() => {
        console.log('hello');
        const fetch_data = async () => {
            const response = await fetchNonCommReport();
            console.log("Fetched Data:", response);

            setStackedColumnData(response.data);
        }
        fetch_data()
            .then(() => setLoading(false));
    }, []);

    if (loading) return <div>loading...</div>;
    return (
        <div>
            Hello jbj
        </div>
    )
}

export default TotalView;