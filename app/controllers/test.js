module.exports = (router,model) =>{


	
	router.get('/',(req,res)=>{
		res.send('this is a test controller !!')
	})
	return router;
}