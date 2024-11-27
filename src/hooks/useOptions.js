export const useOptions = (options) => {
    return options.map((option) => ({
        label: option.label,
        value: option.value,
    }));
}