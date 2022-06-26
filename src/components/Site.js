import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import useState from 'react-usestateref';

import Modal from './modals/Modal'
import Header from './Header';
import App from './App';
import Footer from './Footer';

library.add(fas, fab);

export default function Site() {
  const [modalIsVisible, setModalIsVisible, modalIsVisibleRef] = useState(false);
  const [modalContent, setModalContent, modalContentRef] = useState({head: "", body: ""});
  const [modal, setModal] = useState(<Modal modalContent={{head: "", body: ""}} updateModal={""} showModal={""} hideModal={""} modalIsVisible={modalIsVisibleRef} />);

  const updateModal = (modal) => {
    setModalContent(modal);
  }

  const showModal = () => {
    setModalIsVisible(true);
    setModal(<Modal modalContent={modalContentRef} updateModal={updateModal} showModal={showModal} hideModal={hideModal} modalIsVisible={modalIsVisibleRef} />);
  }

  const hideModal = () => {
    setModalIsVisible(false);
    setModal(<Modal modalContent={{head: "", body: ""}} updateModal={updateModal} showModal={showModal} hideModal={hideModal} modalIsVisible={modalIsVisibleRef} />);
  }

  return (
    <>
      {modal}
      <Header updateModal={updateModal} showModal={showModal} hideModal={hideModal}/>
      <App updateModal={updateModal} showModal={showModal} hideModal={hideModal}/>
      <Footer />
    </>
  );
}