declare module 'react-router-nomatch' {

  interface NoMatchProps {
    render(match: boolean): React.ReactElement | null;
    shouldBypass?(location: Location): boolean;
  }

  class NoMatch extends React.Component<NoMatchProps, {}> { }

  export default NoMatch;

}