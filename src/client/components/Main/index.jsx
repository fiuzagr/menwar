import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';

const Main = ({config, children}) => (
  <div id="main">
    <Helmet
      titleTemplate={'%s | ' + config.site.title}
      defaultTitle={config.site.title}
      meta={[
        {'name': 'description', 'content': config.site.description},
      ]} />
    {children}
  </div>
);
Main.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Main;

