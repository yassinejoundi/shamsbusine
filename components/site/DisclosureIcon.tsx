import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function DisclosureIcon() {
  return <span className="disclosure-icon" aria-hidden="true"><FontAwesomeIcon icon={faPlus} /></span>;
}
