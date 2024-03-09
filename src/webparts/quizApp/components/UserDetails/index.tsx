import { Dropdown, IDropdownOption, PrimaryButton, TextField } from '@fluentui/react';
import * as  React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ScreenTypes } from '../../types';

const UserDetails: React.FC = () => {
    const [name, setName] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [countries, setCountries] = React.useState<IDropdownOption[]>([]);
    const { setCurrentScreen } = useQuiz();

    React.useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/https://api.first.org/data/v1/countries')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                return response.json()
            })
            .then((data) => {
                const countryOptions: IDropdownOption[] = Object.keys(data.data).map((key) => ({
                    key: data.data[key].country,
                    text: data.data[key].country,
                }));
                setCountries(countryOptions);
            });
    }, []);

    const isFormValid = () => {

        return name != '' || country != '';
    };

    const startQuiz = () => {
        setCurrentScreen(ScreenTypes.QuestionScreen)
    }

    return (

        <div className='ms-Grid'>
            <div className="ms-Grid-row">
                <TextField label="Name" value={name} onChange={(e, newValue) => setName(newValue || '')} />
            </div>
            <div className="ms-Grid-row">
                <Dropdown label="Country" options={countries} onChange={(e, option) => setCountry(option?.text || '')} />
            </div>
            <div className="ms-Grid-row">
                <PrimaryButton onClick={startQuiz} text="Continue to Quiz" disabled={!isFormValid()} />
            </div>
        </div>
    );
};

export default UserDetails;