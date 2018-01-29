export const required = (value) => value ? undefined : 'Обязательное поле';

export const numeric = (value) => isNaN(value) ? 'Должно быть числом' : undefined;

export const lengthEqual = (length) => (value) => value.length === length ? undefined : `Должен содержать ${length} цифр(-ы)`;

export const date = (value) => (/(^\d{2}\.\d{2}\.\d{4}$)/.test(value)) ? undefined : 'Введите корректную дату';

export const email = (value) => value && !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value) ? 'Некорректный email' : undefined;