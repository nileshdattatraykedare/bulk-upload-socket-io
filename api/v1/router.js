const express         = require('express');
const router         = express.Router();
var con = require('../../db');
router.get('/batches', function(req, res){
  con.query("SELECT * FROM batches", function (err, result, fields) {
     if (err) throw err;
     console.log(result);
    res.render('batches', {batches: result})
   });

})


module.exports = router;
