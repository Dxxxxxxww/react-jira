import { Rate } from 'antd';
import React from 'react';

interface PinProps extends Omit<React.ComponentProps<typeof Rate>, 'onChange'> {
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

export const Pin = ({ checked, onChange, ...restProps }: PinProps) => {
    return (
        <Rate
            count={1}
            value={checked ? 1 : 0}
            {...restProps}
            onChange={(num) => {
                onChange?.(!!num);
            }}
        />
    );
};
