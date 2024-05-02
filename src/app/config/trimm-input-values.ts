import { DefaultValueAccessor } from "@angular/forms";

export const TrimInputValues = () => {

    const original = DefaultValueAccessor.prototype.registerOnChange;

    DefaultValueAccessor.prototype.registerOnChange = function (fn) {
        return original.call(this, value => {
            const trimmed = (value.length && value.length > 0) ? value.trim() : value;
            return fn(trimmed);
        })
    }
}