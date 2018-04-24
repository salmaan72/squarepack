"use strict"

let responseGenerator = {};

responseGenerator.response = function(status, http_res_code, msg, data){
  let resObj = {
    status: status,
    response_code: http_res_code,
    message: msg,
    data: data
  };
  return resObj;
}

module.exports = responseGenerator;
