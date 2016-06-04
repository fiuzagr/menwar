import React, {Component, PropTypes} from 'react';
import {
  Link,
} from 'react-router';


// locally style
import style from './style.styl';


export default class Button extends Component {

  constructor (props) {
    super(props);
  }

  renderLinkButton (className) {
    return this.props.redirect ? (
      // force redirect
      <a
        className={className}
        href={this.props.href}
        disabled={this.props.disabled}>
        {this.props.children}
      </a>
    ) : (
      // history push
      <Link
        className={className}
        to={this.props.href}
        disabled={this.props.disabled}>
        {this.props.children}
      </Link>
    );
  }

  renderFormButton (className) {
    return (
      <button
        className={className}
        onClick={this.props.onClick}
        disabled={this.props.disabled}>
        {this.props.children}
      </button>
    );
  }

  render () {
    const {
      href,
      type,
      size,
    } = this.props;

    const typed = href && !type ? (
      'link'
    ) : (
      type
    );

    const className = style.main
      + (size && ' ' + style[size])
      + (typed && ' ' + style[typed]);

    return href ? (
      this.renderLinkButton(className)
    ) : (
      this.renderFormButton(className)
    );
  }

}

Button.contextTypes = {
};
Button.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  redirect: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
};
Button.defaultProps = {
  href: null,
  onClick: null,
  disabled: false,
  size: 'medium',
  type: '',
};

