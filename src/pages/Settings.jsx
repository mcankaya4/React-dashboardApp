import Row from "../ui/Row.jsx";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm.jsx";

function Settings() {
  return (
    <>
      <Row type="horizontal">
        <h1>Update hotel settings</h1>
      </Row>

      <Row>
        <UpdateSettingsForm />
      </Row>
    </>
  );
}

export default Settings;
