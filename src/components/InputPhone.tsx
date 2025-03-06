import Input, { InputProps } from "./Input";

interface InputPhoneProps extends InputProps {

}

export function InputPhone({ ...props } : InputPhoneProps) {

    const formatToPhone = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value;
        const digits = inputValue.replace(/\D/g,'').substring(0,10);
        if(!digits) {
            event.currentTarget.value = "";
        }
        const areaCode = digits.substring(0,3);
        const prefix = digits.substring(3,6);
        const suffix = digits.substring(6,10);
        
        if(digits.length > 6) {
            event.currentTarget.value = `(${areaCode}) ${prefix}-${suffix}`;
        }
        else if(digits.length > 3) {
            event.currentTarget.value = `(${areaCode}) ${prefix}`;
        }
        else if(digits.length > 0) {
            event.currentTarget.value = `(${areaCode}`;
        }
    };

    return <Input {...props} onKeyUp={formatToPhone} />;
}