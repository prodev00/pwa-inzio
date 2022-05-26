import React, { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'react-toastify/dist/ReactToastify.css';

const ServiceWorkerWrapper = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setWaitingWorker(registration.waiting);
    toast('New Update is Available');
  };

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate, onSuccess: onSWUpdate });
  }, []);

  const reloadPage = useCallback(() => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }, [waitingWorker]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={false}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      onClick={reloadPage}
      pauseOnHover
    />
  )
};

export default ServiceWorkerWrapper;
