//import axios from 'axios';
import { Country } from '../types';

const getCountries = async (): Promise<Country[]> => {
    try {

        const countries: Country[] = []// response.data.data;
        const response = await fetch('https://prod-16.westeurope.logic.azure.com/workflows/1eb7861fdc1e4177b687bb6fbd892ed1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-zNpkAbVUQRnzk0cNakMRJ1XHCL1nkn0lOAqe9eg7JI')
        const responseJson = await response.json();
        Object.values(responseJson.data).map((country: Country) => {
            countries.push(country);
        });

        //return countries.map((country) => country.country);
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}

export default getCountries;
