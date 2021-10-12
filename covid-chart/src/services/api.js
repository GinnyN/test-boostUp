import axios from 'axios';


const Api = { 
    getDataByTime: () => {
        return axios.get(`https://disease.sh/v3/covid-19/nyt/usa`).then((data) =>{
            const cropData = data.data;

            return { 
                'cases': cropData.map((item) => ({ 'date': item.date, 'value': item.cases })),
                'deaths': cropData.map((item) => ({ 'date': item.date, 'value': item.deaths }))
            }
        });
    },
    getDataByStates: () => {
        return axios.get('https://disease.sh/v3/covid-19/nyt/states?lastdays=all').then((data) =>{
            const cropData = {};
            
            data.data.map((item) => {
                if(!cropData[item.date]) cropData[item.date] = [];
                cropData[item.date].push(item);
                return item;
            });

            return cropData;
        }) 
    }
}

export default Api;