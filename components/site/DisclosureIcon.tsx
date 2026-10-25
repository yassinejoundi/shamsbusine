import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export function DisclosureIcon() {
  return <span className="disclosure-icon" aria-hidden="true"><FontAwesomeIcon icon={faPlus} className="when-closed" /><FontAwesomeIcon icon={faMinus} className="when-open" /></span>;
}
