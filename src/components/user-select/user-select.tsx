import React from 'react';
import { IdSelect } from '../id-select/id-select';

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    return <IdSelect {...props} />;
};
