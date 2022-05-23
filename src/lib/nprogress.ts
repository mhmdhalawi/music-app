import nProgress from 'nprogress';
import { Router } from 'vue-router';

nProgress.configure({ showSpinner: false });

export function progress(router: Router) {
  router.beforeEach((_to, _from, next) => {
    nProgress.start();
    next();
  });

  router.afterEach(() => {
    nProgress.done();
  });
}
