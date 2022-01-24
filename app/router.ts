import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/hello',controller.image.hello)
  router.post('/uploadImage',controller.image.uploadImage)
};
