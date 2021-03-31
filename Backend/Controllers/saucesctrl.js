const Thing = require('../Models/sauces')


exports.createThing = (req, res, next)=>{
  console.log(req.body.sauce)
  const thingObject = JSON.parse(req.body.sauce)
	delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()//enregistrement dans base de donnée !
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneThing =  (req, res, next) => {
  console.log('qqch')
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
}

exports.like = (req, res, next) => { 
  var like = req.body.like
  var dislike = req.body.dislikes
  var userId = req.body.userId
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      if(like > 0){
        if(thing.userLiked.includes(userId)){
        }
        else{
          thing.userLiked.push(userId)
          thing.like++
        }
        if(thing.userDisliked.includes(userId)){
          thing.dislikes--
          thing.userDisliked = thing.userDiskliked.filter(d =>{
            return d!= userId
          })
        }
      }
      else if(dislike < 0){
        if(thing.userDisliked.includes(userId)){
        }
        else{

          thing.userDisliked.push(userId)
          thing.dislikes++
        }
        if(thing.userLiked.includes(userId)){
          thing.like--
          thing.userLiked = thing.userLiked.filter(d =>{
            return d!= userId
          })
        }
      }
      else{
        if(thing.userDisliked.includes(userId)){
          thing.dislikes--
          thing.userDisliked = thing.userDiskliked.filter(d =>{
            return d!= userId

          })
        }
        if(thing.userLiked.includes(userId)){
          thing.like++
          thing.userLiked = thing.userLiked.filter(d =>{
            return d!= userId
          })
        }
      }
      console.log(thing)
      res.status(200).json({message : 'OK'})
      console.log(11)

    })
    /*.catch(error => {
      console.log(12)
      res.status(404).json({ error })
    });*/

}

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    console.log(1)
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getAllStuff = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));

}