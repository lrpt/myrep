publish = async (broker,data)=>{
    try{

 const publication = await broker.publish('email_publication', data);
 publication.on('success',console.warn);
 publication.on('error', console.error);
} catch(err) {
  console.error(err);
}
}

module.exports=publish;