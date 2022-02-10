const router=require('express').Router()
const {
    getModelById,
    getAllModels,
    getModel,
    postModel
}=require('../controller/Upload')

router.param("modelId",getModelById)
router.get("/get",getAllModels)
router.get("/get:modelId",getModel)
router.post("/post",postModel)

module.exports = router
