export interface UserConfiguration {

    preferedTheme: 'light' | 'dark';
    preferedLanguage: 'es' | 'en';

}

export const initUserConfiguration: UserConfiguration = {

    preferedTheme: 'light',
    preferedLanguage: 'es'

}