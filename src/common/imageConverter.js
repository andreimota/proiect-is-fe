File.prototype.convertToBase64 = function(callback){

  var FR= new FileReader();
  FR.onload = function(e) {
    callback(e.target.result);
  };       
  FR.readAsDataURL(this);
};