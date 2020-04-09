import express from 'express';
import Images from '../controllers/images';
const router = express();
router.get('/api/v1/images', Images.AllImages);
router.get('/api/v1/images/:id', Images.oneImage);
router.get('/api/v1/search/images', Images.searchImages);
router.get('/api/v1/images/latest/imagesearch', Images.recentSearchString);
router.post('/api/v1/images/add', Images.addImage);
export default router;
