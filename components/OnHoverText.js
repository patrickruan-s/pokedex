import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const OnHoverText = ({ text, hoverContent }) => (
  <div className="hoverable-text">
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content={hoverContent}
      data-tooltip-place="top"
    >
      {text}
    </div>
    <Tooltip id="my-tooltip">{hoverContent}</Tooltip>
  </div>
);

export default OnHoverText;
