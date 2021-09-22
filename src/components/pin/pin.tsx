import { Rate } from 'antd';

interface PinProps {
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

export const Pin = ({ checked, onChange }: PinProps) => {
    return (
        <Rate
            count={1}
            value={checked ? 1 : 0}
            onChange={(num) => {
                onChange?.(!!num);
            }}
        />
    );
};
