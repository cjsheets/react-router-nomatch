import React from "react";
import PropTypes from "prop-types";
import { matchPath, withRouter } from 'react-router-dom';

const NoMatch = (props) => {
    const { children, location, component, render, alwaysRender, shouldBypass } = props;
    let match = false;

    if (shouldBypass && shouldBypass(location)) {
        return <>{children}</>;
    }

    React.Children.forEach(children, child => {
        if (!match && React.isValidElement(child)) {
            const path = child.props.path || child.props.from;
            const children = child.props.children;
            if (path != null) {
                match = !!matchPath(location.pathname, { ...child.props, path });

            } else if (children && children.forEach) {
                // Support <Switch> components
                children.forEach(_child => {
                    const _path = _child.props.path || _child.props.from;
                    if (_path != null) {
                        match = !!matchPath(location.pathname, { ..._child.props, _path });
                    }
                });
            }
        }
    });

    return (<>
        { (!match || alwaysRender) && (component ? React.createElement(component, {match}) : (render ? render(match) : null)) }
        { children }
    </>);
}

NoMatch.propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    component: PropTypes.elementType,
    render: PropTypes.func,
    alwaysRender: PropTypes.bool,
    shouldBypass: PropTypes.func
};

NoMatch.defaultProps = {
    alwaysRender: false
}

export default withRouter(NoMatch);
