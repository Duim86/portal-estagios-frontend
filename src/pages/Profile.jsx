import MyProfile from '../components/MyProfile';
import MySelectionProcesses from '../components/MySelectionProcess';

import Header from '../components/Header';
import EditProfile from '../components/EditProfile';

function Profile() {
  return (
    <>
      <Header />
      <div className="container-fluid d-flex align-items-center">
        <div
          className="nav flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link active"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          >
            Meu Perfil
          </button>
          <button
            className="nav-link"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            Processos Seletivos
          </button>
          <button
            className="nav-link"
            id="v-pills-configurations-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-configurations"
            type="button"
            role="tab"
            aria-controls="v-pills-configurations"
            aria-selected="false"
          >
            Editar Perfil
          </button>
        </div>
        <div className="tab-content container-fluid" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <MyProfile />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <MySelectionProcesses />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-configurations"
            role="tabpanel"
            aria-labelledby="v-pills-configurations-tab"
          >
            <EditProfile />
          </div>
          <div />
        </div>
      </div>
    </>
  );
}

export default Profile;
