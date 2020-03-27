import api from '../../services/api';

export const loadIncidents = async ({
    setIncidents, 
    incidents, 
    setTotal, 
    total, 
    setLoading, 
    loading, 
    setPage, 
    page}) => {
    if(loading){
        return;
    }

    if(total > 0 && incidents.length == total){
        return;
    }

    setLoading(true);
    
    const response = await api.get('incidents', {
        params: { page }
    });

    setIncidents([...incidents, ...response.data]);

    //This return a string of total values
    setTotal(response.headers['x-total-count']);

    setLoading(false);
    setPage(page + 1);
}

export const navigateToDetail = (navigation, incident) => () => {
    navigation.navigate('Detail', { incident });
}