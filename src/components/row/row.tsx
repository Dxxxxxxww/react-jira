import styled from '@emotion/styled';

export const Row = styled.div<{ gap?: number | boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    > * {
        display: flex;
        margin: 0;
        margin-right: ${($props) =>
            typeof $props.gap === 'number'
                ? $props.gap + 'rem'
                : $props.gap
                ? '2rem'
                : undefined};
    }
`;
