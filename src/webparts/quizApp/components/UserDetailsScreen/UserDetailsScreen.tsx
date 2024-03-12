import { ChoiceGroup, ComboBox, IChoiceGroupOption, IComboBox, IComboBoxOption, PrimaryButton, Stack, TextField } from '@fluentui/react';
import * as  React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { Country, ScreenTypes } from '../../../../shared/types';
import getCountries from '../../../../shared/services/CountryService';
import { useState } from 'react';
import { saveUserDetails } from '../../../../shared/services/SPService';

const UserDetailsScreen: React.FC = () => {
    const [countries, setCountries] = useState<IComboBoxOption[]>([]);
    const [form, setForm] = useState({ name: '', email: '', gender: '', country: '' });
    const [errors, setErrors] = useState({ name: '', email: '', gender: '', country: '' });
    const { userQuizList, setCurrentScreen, userDetails, setUserDetails, timer } = useQuiz();

    React.useEffect(() => {
        getCountries().then((countries: Country[]) => {
            console.log(countries);
            const countryOptions: IComboBoxOption[] = countries.map((country) => ({
                key: country.country,
                text: country.country,
            }));
            setCountries(countryOptions);
        });
    }, []);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setForm({ ...form, [event.currentTarget.name]: newValue || '' });
        setErrors({ ...errors, [event.currentTarget.name]: newValue ? '' : 'This field is required' });

    };

    const handleComboBoxChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption) => {
        setForm({ ...form, country: String(option?.key) || '' });
        setErrors({ ...errors, country: option?.key ? '' : 'This field is required' });
    };
    const handleGenderChoiceGroupChange = (event: React.FormEvent<HTMLInputElement>, option?: IChoiceGroupOption) => {
        setForm({ ...form, gender: option?.key || '' });
        setErrors({ ...errors, gender: option?.key ? '' : 'This field is required' });
    };

    const startQuiz = () => {
        const { name, email, gender, country } = form;
        if (!name || !email || !gender || !country) {
            setErrors({
                name: name ? '' : 'This field is required',
                email: email ? '' : 'This field is required',
                gender: gender ? '' : 'This field is required',
                country: country ? '' : 'This field is required',
            });
            return;
        }

        try {
            saveUserDetails(userQuizList, form, timer).then((item): void => {
                console.log(item);
                if (item) {
                    console.log('User details saved successfully');
                    console.log(item);
                    setUserDetails({ ...form, id: item.data.Id, endTime: item.data.EndTime });
                }
            });
        } catch (error) {
            console.error('Error saving data to SharePoint list', error);
        }
        console.log(userDetails);
        setCurrentScreen(ScreenTypes.QuestionScreen)
    }

    const hasErrors = Object.values(errors).some(error => error !== '');

    return (
        <div>
            <Stack tokens={{ childrenGap: 10 }} styles={{ root: { height: '50vh', justifyContent: 'space-between', overflowY: 'auto', maxHeight: '100vh' } }}>
                <Stack tokens={{ childrenGap: 10 }}>
                    <TextField label="Name" name="name" value={form.name} onChange={handleInputChange} required errorMessage={errors.name} />
                    <TextField label="Email" name="email" value={form.email} onChange={handleInputChange} required errorMessage={errors.email} />
                    <ChoiceGroup
                        label="Gender"
                        selectedKey={form.gender}
                        options={[
                            { key: 'Male', text: 'Male' },
                            { key: 'Female', text: 'Female' },
                        ]}
                        styles={{
                            flexContainer: {
                                display: "flex",
                                alignItems: "center"
                            }
                        }}
                        onChange={handleGenderChoiceGroupChange}
                        required
                    />
                    <ComboBox label="Country" options={countries} onChange={handleComboBoxChange} allowFreeform autoComplete="on" required errorMessage={errors.country} />

                </Stack>
                <Stack horizontalAlign="end">
                    <PrimaryButton text="Start Quiz" onClick={startQuiz} disabled={hasErrors} />
                </Stack>
            </Stack>
        </div>
    );

};

export default UserDetailsScreen;