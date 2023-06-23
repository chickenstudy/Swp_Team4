import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useContext } from "react";
import { ApplicationContext } from "../../App";

function Account() {
  const { makeSignOut } = useContext(ApplicationContext);
  return (
    <>
      <ButtonGroup variant="light">
        <DropdownButton
          as={ButtonGroup}
          title={
            <>
              <i className="bi bi-person-circle mr-2"></i>
            </>
          }
          drop="down"
        >
          <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={makeSignOut}>
            Log out
          </Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </>
  );
}

export default Account;
