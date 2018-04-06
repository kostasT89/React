import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

import './ReactTooltipWithIcon.scss';

const ReactTooltipWithIcon = ({ icon, message, id, optionalClass }) => {
  const tooltipId = `${message}_${id}`;
  return (
    <div key={id} className={`lc-react-tooltip-with-icon ${optionalClass}`}>
      <a data-tip data-for={tooltipId} className="lc-react-tooltip__ancor">
        <div className="lc-react-tooltip-with-icon__icon">
          <i className={`fa fa-${icon}`} aria-hidden="true" />
        </div>
      </a>
      <ReactTooltip key={tooltipId} id={tooltipId} place="top" type="dark" effect="solid">
        <span>{message}</span>
      </ReactTooltip>
    </div>
  );
};

ReactTooltipWithIcon.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
  id: PropTypes.number,
  optionalClass: PropTypes.string
};

export default ReactTooltipWithIcon;
