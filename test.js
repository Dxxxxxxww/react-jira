// -----

export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee'
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222'
    }
};

export const ThemeContext = React.createContext(
    themes.light // 默认值
);

class ThemedButton extends React.Component {
    render() {
        let props = this.props;
        let theme = this.context;
        return (
            <button {...props} style={{ backgroundColor: theme.background }} />
        );
    }
}
ThemedButton.contextType = ThemeContext;

// 一个使用 ThemedButton 的中间组件
function Toolbar(props: any) {
    return (
        // @ts-ignore
        <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>
    );
}

class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            theme: themes.light
        };
        // @ts-ignore
        this.toggleTheme = () => {
            this.setState((state) => ({
                // @ts-ignore
                theme: state.theme === themes.dark ? themes.light : themes.dark
            }));
        };
    }

    render() {
        // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
        // 而外部的组件使用默认的 theme 值
        return (
            <div>
                {/* @ts-ignore  */}
                <ThemeContext.Provider value={this.state.theme}>
                    {/* @ts-ignore  */}
                    <Toolbar changeTheme={this.toggleTheme} />
                </ThemeContext.Provider>
                <div>
                    <ThemedButton />
                </div>
            </div>
        );
    }
}
