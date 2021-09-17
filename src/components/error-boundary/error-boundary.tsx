import React from 'react';

interface FallBackRender {
    (props: { error: Error | null }): React.ReactElement;
}

export class ErrorBoundary extends React.Component<
    React.PropsWithChildren<{ fallBackRender: FallBackRender }>,
    { error: Error | null }
> {
    state = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        const { error } = this.state;
        const { fallBackRender, children } = this.props;
        if (error) {
            return fallBackRender({ error });
        }
        return children;
    }
}
