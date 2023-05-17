const express=require('express')
const router=express.Router()
const {getAllProduct,getAllProductStatic}=require('../controller/store-controller')






router.route('/').get(getAllProduct)
router.route('/static').get(getAllProductStatic)




 

module.exports=router