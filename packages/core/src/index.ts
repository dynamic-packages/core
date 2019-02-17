import Runtime from './boot/Runtime';

function loadDynamicPackages(runtimeConfig: any) {
  (new Runtime(runtimeConfig)).start();
}

export default loadDynamicPackages;
